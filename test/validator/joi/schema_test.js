'use strict';

var schema          = require('../../../validator/joi/schema'),
    userSchema      = require('../../../validator/schema/user'),
    expect          = require('chai').expect;

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
