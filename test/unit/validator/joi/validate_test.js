'use strict';

var joi             = require('joi'),
    expect          = require('chai').expect,
    Bim             = require('../../../../src/bim/bim'),
    BimError        = require('../../../../src/bim/bimError'),
    validate        = require('../../../../src/validator/joi/validate');

describe('validator / joi / validate()', function() {
    it('should not validate the value', function(done) {
        var schema = {
            username: joi.string().alphanum().min(3).max(30).required()
        };

        var testUser = {
            username: 'ab'
        };

        validate(testUser, schema)
            .then(null, function(err) {
                var value = err.value,
                    bim = err.bim;

                expect(bim)
                    .to.be.an.instanceOf(Bim);

                expect(bim.isValid())
                    .to.be.false;

                expect(bim.errors[0])
                    .to.be.an.instanceOf(BimError);

                expect(bim.errors[0].path)
                    .to.be.an.equals('username');

                expect(testUser)
                    .to.be.deep.equals(value);

                done();
            });
    });

    it('should valid the value', function(done) {
        var schema = {
            username: joi.string().alphanum().min(3).max(30).required()
        };

        var testUser = {
            username: 'stan'
        };

        validate(testUser, schema)
            .then(function(err) {
                var value = err.value,
                    bim = err.bim;

                expect(bim)
                    .to.be.an.instanceOf(Bim);

                expect(bim.isValid())
                    .to.be.true;

                expect(testUser)
                    .to.be.deep.equals(value);

                done();
            });
    });
});
