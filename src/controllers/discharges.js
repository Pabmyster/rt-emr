const ajv = require('ajv')({
    removeAdditional: true,
    useDefaults: true
});
const schema = require('../models/discharges');
const validateDischarges = ajv.compile(schema);

exports.create = async (req,res,next) => {
    validateDischarges(req.body)
    .then(data => {
        req.app.get('rdb').table('discharges').insert(data).run()
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
    req.app.get('rdb').table('discharges').run()
    .then(discharges => res.send(discharges))
    .catch(err => {res.statusCode = 404; throw Error(err)});
};

exports.findOne = async (req,res,next) => {
    req.app.get('rdb').table('discharges').get(req.params.dischargeId).run()
    .then(discharge => res.send(discharge))
    .catch(err => res.status(404).send("Could not find Discharge with ID " + req.params.dischargeId));
};

exports.update = async (req,res,next) => {
    if(!req.body)
        res.status(400).send("Discharge cannot be empty");

    validateDischarges(req.body)
    .then(data => {
        req.app.get('rdb').table('discharges').get(req.params.dischargeId).update(data).run()
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
    req.app.get('rdb').table('discharges').get(req.params.dischargeId).delete().run()
    .then(result => res.send(JSON.stringify(result)))
    .catch(err => res.status(404).send(err));
};