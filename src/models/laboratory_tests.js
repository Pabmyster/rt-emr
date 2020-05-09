let laboratory_tests = {
    type: 'object',
    properties: {
        patient_id: {type: 'string'},
        lab_tech_id: { type: 'string'},
        order_number: { type: 'number'},
        test_date: {
            type: 'string',
            format: 'date-time',
            default: new Date().toISOString()
        },
        laboratory_test_code: { type: 'number'},
        name: { type: 'string'},
        results: { type: 'object'}
    },
    required: ['patient_id','lab-tech_id','name'],
    "$schema": "http://json-schema.org/schema#",
    additionalProperties: false,
    "$async": true
};

module.exports = laboratory_tests;
