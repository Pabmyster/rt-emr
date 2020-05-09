let staff = {
    type: 'object',
    properties: {
        person_id: {type: 'string'},
        office_id: {type: 'string'},
        position_id: {type: 'string'},
        licence_number: {type: 'string'},
        current_ward: {type: 'string'}
    },
    required: ['person_id', 'position_id'],
    "$schema": "http://json-schema.org/schema#",
    additionalProperties: false,
    "$async": true
};

module.exports = staff;
