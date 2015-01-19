'use strict';

var InternalBim     = require('../../../bim/internalBim'),
    expect          = require('chai').expect,
    errors          = require('../../../validator/errors');

describe('bim / InternalBim', function() {
    it('constructor', function() {
        var internalBim = new InternalBim();

        expect(internalBim)
            .to.have.property('errors')
            .that.is.an('array');

        expect(internalBim)
            .to.have.property('status')
            .to.be.equals(500);

        expect(internalBim.errors[0])
            .to.have.property('code')
            .to.be.equals(errors.global.internal.code);

        expect(internalBim.errors[0])
            .to.have.property('path')
            .to.be.null();

        expect(internalBim.errors[0])
            .to.have.property('message')
            .to.be.equals(errors.global.internal.message);
    });

    it('constructor with parameters', function() {
        var internalBim = new InternalBim('specific_code', 'specific message');

        expect(internalBim)
            .to.have.property('errors')
            .that.is.an('array');

        expect(internalBim)
            .to.have.property('status')
            .to.be.equals(500);

        expect(internalBim.errors[0])
            .to.have.property('code')
            .to.be.equals('specific_code');

        expect(internalBim.errors[0])
            .to.have.property('path')
            .to.be.null();

        expect(internalBim.errors[0])
            .to.have.property('message')
            .to.be.equals('specific message');
    });

    it('render()', function() {
        // TODO Compare render data with raw data
        // expect(bim.render('json')).to.be.deep.equals({errors:[{code:'code',path:'my.path',message:'my message'}]});
    });

    it('isBim', function() {
        var internalBim = new InternalBim();
        expect(internalBim.isBim).to.be.true();
    });
});
