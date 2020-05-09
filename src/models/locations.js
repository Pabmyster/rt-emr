let locations = {
    type: 'object',
    properties: {
        address: { type: 'string'},
        city: { type: 'string'},
        country: { type: 'string'},
        postal_code: { type: 'string'},
        location_style: {
            type: 'string',
            default: 'house'
        }
    },
    required: ['address'],
    "$schema": "http://json-schema.org/schema#",
    additionalProperties: false,
    "$async": true
};

module.exports = locations;
