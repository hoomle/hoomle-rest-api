'use strict';

var Bim                 = require('../../bim/bim'),
    errors              = require('../../validator/errors'),
    homepageValidator   = require('../../validator/homepage'),
    schema              = require('../../validator/joi/schema'),
    expect              = require('chai').expect;

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

    it('_ownerExist() check if the owner exist', function(done) {
        var homepage = {owner: '5478f34eb576b4a30295d914'};
        var bim = new Bim();
        homepageValidator._ownerExist(
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

    it('_ownerExist() check if the owner does not exist', function(done) {
        var homepage = {owner: '5478f34eb576b4a302111111'};
        var bim = new Bim();
        homepageValidator._ownerExist(
                homepage,
                bim,
                schema.getSchema('homepage', 'default')
            )
            .then(null, function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(homepage);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.errors[0].code)
                    .to.be.equals(errors.homepage.owner_not_exist.code);

                expect(resolved.bim.errors[0].path)
                    .to.be.equals('owner');

                expect(resolved.bim.errors[0].message)
                    .to.be.equals(errors.homepage.owner_not_exist.message);

                expect(resolved.bim.isValid())
                    .to.be.false;

                done();
            });
    });

    it('validate() valid values', function(done) {
        var homepage = {
            slug            : 'unused_name',
            bio             : 'my bio',
            location        : 'Orleans',
            owner           : '5478f34eb576b4a30295d914'
        };
        var bim = new Bim();
        homepageValidator.validate(
            homepage,
            bim,
            schema.getSchema('homepage')
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
            location        : 'O',
            owner           : '5478f34eb576b4a302111111'
        };
        var bim = new Bim();
        homepageValidator.validate(
            homepage,
            bim,
            schema.getSchema('homepage')
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

                expect(resolved.bim.hasErrorWithPath('owner'))
                    .to.be.true;

                expect(resolved.bim.isValid())
                    .to.be.false;

                done();
            });
    });
});
