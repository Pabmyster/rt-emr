let procedures = {
    type: 'object',
    properties: {
        patient_id: {type: 'string'},
        doctor_id: {type: 'string'},
        procedure_type_id: {type: 'string'},
        date: {
            type: 'string',
            format: 'date'
        },
        outcome: { type: 'string'},
        encounter_id: { type: 'string'}
    },
    required: ['patient_id', 'doctor_id', 'procedure_name'],
    "$schema": "http://json-schema.org/schema#",
    additionalProperties: false,
    "$async": true
};

module.exports = procedures;
