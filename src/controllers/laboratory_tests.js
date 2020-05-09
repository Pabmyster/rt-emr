const ajv = require('ajv')({
    removeAdditional: true,
    useDefaults: true
});
const schema = require('../models/laboratory_tests');
const validateLaboratoryTests = ajv.compile(schema);

exports.create = async (req,res,next) => {
    validateLaboratoryTests(req.body)
    .then(data => {
        req.app.get('rdb').table('laboratory_tests').insert(data).run()
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
    req.app.get('rdb').table('laboratory_tests').run()
    .then(laboratory_tests => res.send(laboratory_tests))
    .catch(err => {res.statusCode = 404; throw Error(err)});
};

exports.findOne = async (req,res,next) => {
    req.app.get('rdb').table('laboratory_tests').get(req.params.laboratory_testId).run()
    .then(laboratory_test => res.send(laboratory_test))
    .catch(err => res.status(404).send("Could not find LaboratoryTest with ID " + req.params.laboratory_testId));
};

exports.update = async (req,res,next) => {
    if(!req.body)
        res.status(400).send("LaboratoryTest cannot be empty");

    validateLaboratoryTests(req.body)
    .then(data => {
        req.app.get('rdb').table('laboratory_tests').get(req.params.laboratory_testId).update(data).run()
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
    req.app.get('rdb').table('laboratory_tests').get(req.params.laboratory_testId).delete().run()
    .then(result => res.send(JSON.stringify(result)))
    .catch(err => res.status(404).send(err));
};