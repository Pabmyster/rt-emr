let encounters = {
    type: 'object',
    properties: {
        patient_id: {type: 'string'},
        nurse_id: { type: 'string'},
        doctor_id: { type: 'string'},
        diagnosis: {type: 'string'},
        problem: { type: 'string'},
        encounter_date: {
            type: 'string',
            format: 'date-time',
            default: new Date().toISOString()
        }
    },
    required: ['patient_id','doctor_id'],
    "$schema": "http://json-schema.org/schema#",
    additionalProperties: false,
    "$async": true
};

module.exports = encounters;
