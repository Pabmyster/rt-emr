const ajv = require('ajv')({
    removeAdditional: true,
    useDefaults: true
});
const schema = require('../models/encounters');
const validateEncounters = ajv.compile(schema);

exports.create = async (req,res,next) => {
    validateEncounters(req.body)
    .then(data => {
        req.app.get('rdb').table('encounters').insert(data).run()
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
    req.app.get('rdb').table('encounters').run()
    .then(encounters => res.send(encounters))
    .catch(err => {res.statusCode = 404; throw Error(err)});
};

exports.findOne = async (req,res,next) => {
    req.app.get('rdb').table('encounters').get(req.params.encounterId).run()
    .then(encounter => res.send(encounter))
    .catch(err => res.status(404).send("Could not find Encounter with ID " + req.params.encounterId));
};

exports.update = async (req,res,next) => {
    if(!req.body)
        res.status(400).send("Encounter cannot be empty");

    validateEncounters(req.body)
    .then(data => {
        req.app.get('rdb').table('encounters').get(req.params.encounterId).update(data).run()
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
    req.app.get('rdb').table('encounters').get(req.params.encounterId).delete().run()
    .then(result => res.send(JSON.stringify(result)))
    .catch(err => res.status(404).send(err));
};