const checkJwt = require('../check_auth_token');

module.exports = (app) => {
    const encounters = require('../controllers/encounters.js');

    // Create new encounter
    app.post('/encounters', checkJwt, encounters.create);

    // Retrieve all encounters
    app.get('/encounters', checkJwt,  encounters.findAll);

    // Retrieve a single encounters with encounterId
    app.get('/encounters/:encounterId', checkJwt,  encounters.findOne);

    // Update a encounters with encounterId
    app.put('/encounters/:encounterId', checkJwt,  encounters.update);

    // Delete a encounter with encounterId
    app.delete('/encounters/:encounterId', checkJwt,  encounters.delete);
}