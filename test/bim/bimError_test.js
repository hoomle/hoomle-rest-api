'use strict';

var BimError        = require('../../bim/bimError'),
    expect          = require('chai').expect;

describe('bim / BimError', function() {
    it('constructor', function() {
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

    it('constructor with value passed as parameters', function() {
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

    it('isBim', function() {
        var bimError = new BimError();
        expect(bimError.isBim).to.be.true();
    });
});
