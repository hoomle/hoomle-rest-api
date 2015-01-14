'use strict';

var NotFoundBim     = require('../../bim/notFoundBim'),
    expect          = require('chai').expect,
    errors          = require('../../validator/errors');

describe('bim / NotFoundBim', function() {
    it('constructor', function() {
        var notFoundBim = new NotFoundBim();

        expect(notFoundBim)
            .to.have.property('errors')
            .that.is.an('array');

        expect(notFoundBim)
            .to.have.property('status')
            .to.be.equals(404);

        expect(notFoundBim.errors[0])
            .to.have.property('code')
            .to.be.equals(errors.global.not_found.code);

        expect(notFoundBim.errors[0])
            .to.have.property('path')
            .to.be.null();

        expect(notFoundBim.errors[0])
            .to.have.property('message')
            .to.be.equals(errors.global.not_found.message);
    });

    it('constructor with parameters', function() {
        var notFoundBim = new NotFoundBim('specific_code', 'specific message');

        expect(notFoundBim)
            .to.have.property('errors')
            .that.is.an('array');

        expect(notFoundBim)
            .to.have.property('status')
            .to.be.equals(404);

        expect(notFoundBim.errors[0])
            .to.have.property('code')
            .to.be.equals('specific_code');

        expect(notFoundBim.errors[0])
            .to.have.property('path')
            .to.be.null();

        expect(notFoundBim.errors[0])
            .to.have.property('message')
            .to.be.equals('specific message');
    });

    it('render()', function() {
        // TODO Compare render data with raw data
        // expect(bim.render('json')).to.be.deep.equals({errors:[{code:'code',path:'my.path',message:'my message'}]});
    });

    it('isBim', function() {
        var notFoundBim = new NotFoundBim();
        expect(notFoundBim.isBim).to.be.true();
    });
});
