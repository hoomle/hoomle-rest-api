'use strict';

var bimErrorAdapter = require('../../../../../src/bim/adapters/joi/bimErrorAdapter'),
    BimError        = require('../../../../../src/bim/bimError'),
    expect          = require('chai').expect;

describe('bim / adapter / joi / bimErrorAdapter', function() {
    it('error without message', function() {
        var joiError = {
            path: 'username',
            type: 'string.length'
        };
        var bimError = bimErrorAdapter(joiError);

        expect(bimError)
            .to.be.an.instanceOf(BimError);

        expect(bimError.code)
            .to.be.equals(joiError.type);

        expect(bimError.path)
            .to.be.equals(joiError.path);

        expect(bimError.message)
            .to.be.equals(null);
    });

    it('error with message', function() {
        var joiError = {
            path: 'username',
            type: 'string.length',
            message: 'your username length is invalid'
        };
        var bimError = bimErrorAdapter(joiError);

        expect(bimError)
            .to.be.an.instanceOf(BimError);

        expect(bimError.code)
            .to.be.equals(joiError.type);

        expect(bimError.path)
            .to.be.equals(joiError.path);

        expect(bimError.message)
            .to.be.equals(joiError.message);
    });

    it('bad joi object', function() {
        var joiError = {
            path: 'username'
        };
        var bimError = bimErrorAdapter(joiError);

        expect(bimError)
            .to.be.null;
    });
});
