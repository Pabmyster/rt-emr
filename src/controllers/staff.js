const ajv = require('ajv')({
    removeAdditional: true,
    useDefaults: true
});
const schema = require('../models/staff');
const validateStaff = ajv.compile(schema);

exports.create = async (req,res,next) => {
    validateStaff(req.body)
    .then(data => {
        req.app.get('rdb').table('staff').insert(data).run()
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
    req.app.get('rdb').table('staff').run()
    .then(staff => res.send(staff))
    .catch(err => {res.statusCode = 404; throw Error(err)});
};

exports.findOne = async (req,res,next) => {
    req.app.get('rdb').table('staff').get(req.params.staffId).run()
    .then(staff => res.send(staff))
    .catch(err => res.status(404).send("Could not find Staff with ID " + req.params.staffId));
};

exports.update = async (req,res,next) => {
    if(!req.body)
        res.status(400).send("Staff cannot be empty");

    validateStaff(req.body)
    .then(data => {
        req.app.get('rdb').table('staff').get(req.params.staffId).update(data).run()
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
    req.app.get('rdb').table('staff').get(req.params.staffId).delete().run()
    .then(result => res.send(JSON.stringify(result)))
    .catch(err => res.status(404).send(err));
};