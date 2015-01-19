'use strict';

var bimAdapter      = require('../../../../../bim/adapters/joi/bimAdapter'),
    Bim             = require('../../../../../bim/bim'),
    BimError        = require('../../../../../bim/bimError'),
    expect          = require('chai').expect;

describe('bim / adapter / joi / bimAdapter', function() {
    it('adapt joi error with errors', function() {
        var joiErrors = {
            details: [
                {
                    path: 'username',
                    type: 'string.length'
                }
            ]
        };
        var bim = bimAdapter(joiErrors);

        expect(bim)
            .to.be.an.instanceOf(Bim);

        expect(bim.errors)
            .to.be.an.instanceOf(Array);

        expect(bim.isValid())
            .to.be.false;

        expect(bim.errors.length)
            .to.be.equals(1);

        expect(bim.errors[0])
            .to.be.an.instanceOf(BimError);
    });

    it('bad joi error', function() {
        var joiErrors = {};
        var bim = bimAdapter(joiErrors);

        expect(bim)
            .to.be.an.instanceOf(Bim);

        expect(bim.isValid())
            .to.be.true;

        expect(bim.errors)
            .to.be.an.instanceOf(Array);

        expect(bim.errors.length)
            .to.be.equals(0);
    });
});
