let wards = {
    type: 'object',
    properties: {
        department_name: { type: 'string'},
        floor: { type: 'string'}
    },
    required: ['department_name'],
    "$schema": "http://json-schema.org/schema#",
    additionalProperties: false,
    "$async": true
};

module.exports = wards;
