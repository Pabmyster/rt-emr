const ajv = require('ajv')({
    removeAdditional: true,
    useDefaults: true
});
const schema = require('../models/patients');
const validatePatients = ajv.compile(schema);

exports.create = async (req,res,next) => {
    validatePatients(req.body)
    .then(data => {
        req.app.get('rdb').table('patients').insert(data).run()
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
    req.app.get('rdb').table('patients').run()
    .then(patients => res.send(patients))
    .catch(err => {res.statusCode = 404; throw Error(err)});
};

exports.findOne = async (req,res,next) => {
    console.log("wat");
    req.app.get('rdb').table('patients').get(req.params.patientId).run()
    .then(patient => res.send(patient))
    .catch(err => res.status(404).send("Could not find Patient with ID " + req.params.patientId));
};

exports.indexSearch = async (req,res,next) => {
    req.app.get('patientIndex').search(req.params.searchParam)
    .then(results => {
        if(req.query.staff)
            results = results.filter(patient => patient.assigned_doctor_id === req.query.staff || patient.assigned_nurse_id === req.query.staff);
        res.send(results)
    })
    .catch(err => res.status(400).send(err));
};

exports.assigned = async (req,res,next) => {
    res.app.get('patientIndex').search({
        field: ['assigned_doctor_id', 'assigned_nurse_id'],
        bool: 'or',
        query: req.params.staffId
    })
    .then(results => res.send(results))
    .catch(err => res.status(400).send(err))
}

exports.update = async (req,res,next) => {
    if(!req.body)
        res.status(400).send("Patient cannot be empty");

    validatePatients(req.body)
    .then(data => {
        req.app.get('rdb').table('patients').get(req.params.patientId).update(data).run()
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
    req.app.get('rdb').table('patients').get(req.params.patientId).delete().run()
    .then(result => res.send(JSON.stringify(result)))
    .catch(err => res.status(404).send(err));
};