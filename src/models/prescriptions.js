let prescriptions = {
    type: 'object',
    properties: {
        patient_id: {type: 'string'},
        doctor_id: {type: 'string'},
        medication_id: {type: 'string'},
        quantity: {type: 'number'}
    },
    required: ['patient_id', 'medication_id', 'quantity'],
    "$schema": "http://json-schema.org/schema#",
    additionalProperties: false,
    "$async": true
};

module.exports = prescriptions;
