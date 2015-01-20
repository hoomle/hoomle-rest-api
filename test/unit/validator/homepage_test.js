'use strict';

var Bim                 = require('../../../bim/bim'),
    errors              = require('../../../validator/errors'),
    homepageValidator   = require('../../../validator/homepage'),
    schema              = require('../../../validator/joi/schema'),
    expect              = require('chai').expect;

// Load data for tests
require('../../fixtures.load');

describe('validator / homepage', function() {
    it('_slugAlreadyExist() check if slug not exist', function(done) {
        var homepage = {slug: 'unused_slug'};
        var bim = new Bim();
        homepageValidator._slugAlreadyExist(
            homepage,
                bim,
                schema.getSchema('homepage', 'default')
            )
            .then(function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(homepage);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.isValid())
                    .to.be.true;

                done();
            });
    });

    it('_slugAlreadyExist() slug exist', function(done) {
        var homepage = {slug: 'stan'};
        var bim = new Bim();
        homepageValidator._slugAlreadyExist(
            homepage,
            bim,
            schema.getSchema('homepage', 'default')
        ).then(null, function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(homepage);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.errors[0].code)
                    .to.be.equals(errors.homepage.slug_already_exist.code);

                expect(resolved.bim.errors[0].path)
                    .to.be.equals('slug');

                expect(resolved.bim.errors[0].message)
                    .to.be.equals(errors.homepage.slug_already_exist.message);

                expect(resolved.bim.isValid())
                    .to.be.false;

                done();
            });
    });

    it('validate() valid values', function(done) {
        var homepage = {
            slug            : 'unused_name',
            bio             : 'my bio',
            location        : 'Orleans'
        };
        homepageValidator.validate(
            homepage,
            'default'
        ).then(function(resolved) {
            expect(resolved.value)
                .to.be.deep.equals(homepage);

            expect(resolved.bim)
                .to.be.an.instanceOf(Bim);

            expect(resolved.bim.isValid())
                .to.be.true;

            done();
        });
    });

    it('validate() invalid values', function(done) {
        var homepage = {
            slug            : 'stan',
            bio             : 'm',
            location        : 'O'
        };
        homepageValidator.validate(
            homepage,
            'default'
        ).then(null, function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(homepage);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.hasErrorWithPath('slug'))
                    .to.be.true;

                expect(resolved.bim.hasErrorWithPath('location'))
                    .to.be.true;

                expect(resolved.bim.hasErrorWithPath('bio'))
                    .to.be.true;

                expect(resolved.bim.isValid())
                    .to.be.false;

                done();
            });
    });
});
