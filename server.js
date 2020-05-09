

const express = require("express");
var cors = require('cors')
var fs = require('fs')
var socketioJwt = require("@ohanapediatrics/socketio-jwt");
const checkJwt = require("./src/check_auth_token");
const flexsearch = require('flexsearch');

// Create a new Express app
const app = express();
var protocol;
if(process.env.NODE_ENV === "production") {
  protocol = require('https').createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/emr.nicolasvenne.ca/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/emr.nicolasvenne.ca/fullchain.pem')
  }, app)
} else {
  protocol = require('http').createServer(app);

} 
const io = require('socket.io')(protocol);
const r = require('rethinkdbdash')({
  db: "emrsystem"
});

const authConfig = {
  domain: "nicolasvenne.auth0.com",
  audience: "https://api.nicolasvenne.ca"
};
app.use(cors())

app.use(express.json());
app.set('rdb', r);

//Attaching Routes
require('./src/routes/persons.js')(app);
require('./src/routes/admissions.js')(app);
require('./src/routes/allergies.js')(app);
require('./src/routes/discharges.js')(app);
require('./src/routes/encounters.js')(app);
require('./src/routes/laboratory_tests.js')(app);
require('./src/routes/locations.js')(app);
require('./src/routes/medications.js')(app);
require('./src/routes/offices.js')(app);
require('./src/routes/patients.js')(app);
require('./src/routes/positions.js')(app);
require('./src/routes/prescriptions.js')(app);
require('./src/routes/procedure_types.js')(app);
require('./src/routes/procedures.js')(app);
require('./src/routes/staff.js')(app);
require('./src/routes/transfers.js')(app);
require('./src/routes/wards.js')(app);

const patientFields = ["first_name", "last_name", "address", "city", "dob", "phone_number", "health_card_number", "postal_code", "assigned_doctor_id", "assigned_nurse_id"]
const patientIndex = new flexsearch({
  doc: {
    id: "id",
    field: patientFields
  },
  async: true
});

buildPatientIndex().then(() => {
  app.set('patientIndex', patientIndex);
}).catch(err => console.log(err));

io.use(socketioJwt.authorize({
  jwks: `https://${authConfig.domain}/.well-known/jwks.json`,
  handshake: true
}));

io.on('connection', function(client) {
  console.log("user connection");
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
})

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!"
  });
});

// Start the app
protocol.listen(3001, function(){
  console.log('listening on *:3001');
});

async function buildPatientIndex(){
  return new Promise((resolve,reject) => {
    try{
      r.table("patients").eqJoin("person_id", r.table("persons")).without({right: "id"}).zip()
      .eqJoin("location_id", r.table("locations")).without({right: "id"}).zip().pluck(patientFields,"id").run()
      .then(data => {
        for(let i = 0; i < data.length; i++){
          patientIndex.add(data[i])
        }
        resolve();
      })
      .catch(err => reject(err));
    }
    catch(err){
      reject(err);
    }
  });
}