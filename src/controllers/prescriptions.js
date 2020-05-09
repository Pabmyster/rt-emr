const ajv = require('ajv')({
    removeAdditional: true,
    useDefaults: true
});
const schema = require('../models/prescriptions');
const validatePrescriptions = ajv.compile(schema);

exports.create = async (req,res,next) => {
    validatePrescriptions(req.body)
    .then(data => {
        req.app.get('rdb').table('prescriptions').insert(data).run()
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
    req.app.get('rdb').table('prescriptions').run()
    .then(prescriptions => res.send(prescriptions))
    .catch(err => {res.statusCode = 404; throw Error(err)});
};

exports.findOne = async (req,res,next) => {
    req.app.get('rdb').table('prescriptions').get(req.params.prescriptionId).run()
    .then(prescription => res.send(prescription))
    .catch(err => res.status(404).send("Could not find Prescription with ID " + req.params.prescriptionId));
};

exports.update = async (req,res,next) => {
    if(!req.body)
        res.status(400).send("Prescription cannot be empty");

    validatePrescriptions(req.body)
    .then(data => {
        req.app.get('rdb').table('prescriptions').get(req.params.prescriptionId).update(data).run()
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
    req.app.get('rdb').table('prescriptions').get(req.params.prescriptionId).delete().run()
    .then(result => res.send(JSON.stringify(result)))
    .catch(err => res.status(404).send(err));
};