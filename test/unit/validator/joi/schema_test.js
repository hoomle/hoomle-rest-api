'use strict';

var expect          = require('chai').expect,
    schema          = require('../../../../src/validator/joi/schema'),
    userSchema      = require('../../../../src/validator/schema/user');

describe('validator / joi / schema', function() {
    it('getSchema() default', function() {
        var schemaRetrieved = schema.getSchema('user', 'default');

        expect(schemaRetrieved)
            .to.be.deep.equals(userSchema.default);
    });

    it('getSchema() unknow', function() {
        var schemaRetrieved = schema.getSchema('user', 'kevin');

        expect(schemaRetrieved)
            .to.be.deep.equals(userSchema.default);
    });

    // TODO Check if the "schemaName" exist
});
