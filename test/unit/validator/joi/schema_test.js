'use strict';

var expect          = require('chai').expect,
    schema          = require('../../../../src/validator/joi/schema'),
    userSchema      = require('../../../../src/validator/schema/user');

describe('validator / joi / schema', function() {
    it('getSchema() object', function() {
        var schemaRetrieved = schema.getSchema('user', 'object');

        expect(schemaRetrieved)
            .to.be.deep.equals(userSchema.object);
    });

    it('getSchema() unknow', function() {
        expect(function() {
            schema.getSchema('user', 'unknow')
        }).to.throw('The schema unknow does not exist');
    });
});
