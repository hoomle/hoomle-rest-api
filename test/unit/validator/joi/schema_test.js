'use strict';

var expect          = require('chai').expect,
    schema          = require('../../../../src/validator/joi/schema'),
    userSchema      = require('../../../../src/validator/schema/user');

describe('validator / joi / schema / getSchema()', function() {
    it('should return a schema', function() {
        var schemaRetrieved = schema.getSchema('user', 'object');

        expect(schemaRetrieved)
            .to.be.deep.equals(userSchema.object);
    });

    it('should throw an exception because the schema does not exist', function() {
        expect(function() {
            schema.getSchema('user', 'unknow')
        }).to.throw('The schema unknow does not exist');
    });
});
