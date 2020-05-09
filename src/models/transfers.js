let transfers = {
    type: 'object',
    properties: {
        patient_id: {type: 'string'},
        assigned_nurse_id: {type: 'string'},
        assigned_doctor_id: { type: "string"},
        from_ward_id: {type: 'string'},
        to_ward_id: { type: 'string'},
        discharge_date: {
            type: "string",
            format: "date-time",
            default: new Date().toISOString()
        }
    },
    required: ['patient_id', 'from_ward_id', 'to_ward_id'],
    "$schema": "http://json-schema.org/schema#",
    additionalProperties: false,
    "$async": true
};

module.exports = transfers;
