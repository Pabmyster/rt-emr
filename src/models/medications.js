let medications = {
    type: 'object',
    properties: {
        name: { type: 'string'},
        manufacturer: { type: 'string'},
        strength: { type: 'number'},
        unit_of_measure: { 
            type: 'string',
            default: 'mg'
        },
        side_effects: {
            type: 'array',
            items: {
                type: 'string'
            }
        }
    },
    required: ['name','manufacturer', 'strength'],
    "$schema": "http://json-schema.org/schema#",
    additionalProperties: false,
    "$async": true
};

module.exports = medications;
