const ajv = require('ajv')({
    removeAdditional: true,
    useDefaults: true
});
const schema = require('../models/transfers');
const validateTransfers = ajv.compile(schema);

exports.create = async (req,res,next) => {
    validateTransfers(req.body)
    .then(data => {
        req.app.get('rdb').table('transfers').insert(data).run()
        .then(result => res.send(JSON.stringify(result)))
        .catch(err => res.status(404).send(err));
    })
    .catch(err => {
        if(err.errors)
            res.status(400).send(err.errors);
        else
            res.status(400).send(err);
    });
};

exports.findAll = async (req,res,next) => {
    req.app.get('rdb').table('transfers').run()
    .then(transfers => res.send(transfers))
    .catch(err => {res.statusCode = 404; throw Error(err)});
};

exports.findOne = async (req,res,next) => {
    req.app.get('rdb').table('transfers').get(req.params.transferId).run()
    .then(transfer => res.send(transfer))
    .catch(err => res.status(404).send("Could not find Transfer with ID " + req.params.transferId));
};

exports.update = async (req,res,next) => {
    if(!req.body)
        res.status(400).send("Transfer cannot be empty");

    validateTransfers(req.body)
    .then(data => {
        req.app.get('rdb').table('transfers').get(req.params.transferId).update(data).run()
        .then(result => res.send(JSON.stringify(result)))
        .catch(err => res.status(404).send(err));
    })
    .catch(err => {
        if(err.errors)
            res.status(400).send(err.errors);
        else
            res.status(400).send(err);
    });
};

exports.delete = async (req,res,next) => {
    req.app.get('rdb').table('transfers').get(req.params.transferId).delete().run()
    .then(result => res.send(JSON.stringify(result)))
    .catch(err => res.status(404).send(err));
};