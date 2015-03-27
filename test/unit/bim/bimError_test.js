'use strict';

var expect          = require('chai').expect,
    BimError        = require('../../../src/bim/bimError');

describe('bim / BimError / constructor', function() {
    it('should construct a classic BimError object', function() {
        var bimError = new BimError();

        expect(bimError)
            .to.have.property('code')
            .to.be.null;

        expect(bimError)
            .to.have.property('path')
            .to.be.null;

        expect(bimError)
            .to.have.property('message')
            .to.be.null;
    });

    it('should construct a BimError object with value passed as parameters', function() {
        var bimError = new BimError(
            'code',
            'path',
            'message'
        );

        expect(bimError)
            .to.have.property('code')
            .to.be.equals('code');

        expect(bimError)
            .to.have.property('path')
            .to.be.equals('path');

        expect(bimError)
            .to.have.property('message')
            .to.be.equals('message');
    });

    it('should test the default value of "isBim" property', function() {
        var bimError = new BimError();
        expect(bimError.isBim).to.be.true();
    });
});
