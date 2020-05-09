let discharges = {
    type: 'object',
    properties: {
        patient_id: { type: "string"},
        assigned_nurse_id: { type: "string"},
        assigned_doctor_id: { type: "string"},
        ward_id: { type: "string"},
        discharge_date: {
            type: "string",
            format: "date-time",
            default: new Date().toISOString()
        }
    },
    required: ["patient_id", "ward_id"],
    "$schema": "http://json-schema.org/schema#",
    additionalProperties: false,
    "$async": true
};

module.exports = discharges;
