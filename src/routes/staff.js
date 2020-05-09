const checkJwt = require('../check_auth_token');

module.exports = (app) => {
    const staff = require('../controllers/staff.js');

    // Create new staff
    app.post('/staff', checkJwt, staff.create);

    // Retrieve all staff
    app.get('/staff', checkJwt,  staff.findAll);

    // Retrieve a single staff with staffId
    app.get('/staff/:staffId', checkJwt,  staff.findOne);

    // Update a staff with staffId
    app.put('/staff/:staffId', checkJwt,  staff.update);

    // Delete a staff with staffId
    app.delete('/staff/:staffId', checkJwt,  staff.delete);
}