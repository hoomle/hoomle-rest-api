'use strict';

var Bim                 = require('../../../src/bim/bim'),
    errors              = require('../../../src/validator/errors'),
    homepageValidator   = require('../../../src/validator/homepage'),
    schema              = require('../../../src/validator/joi/schema'),
    expect              = require('chai').expect,
    sinon               = require('sinon'),
    homepageDao         = require('../../../src/manager/dao').Homepage,
    BimError            = require('../../../src/bim/bimError'),
    when                = require('when');

describe('validator / homepage', function() {

    it('_slugAlreadyExist() check if slug not exist', function(done) {
        var homepage = {slug: 'unused_slug'};
        var bim = new Bim();

        var homepageDaoStub = sinon.stub(homepageDao, 'findOneReadOnlyBySlug');

        homepageDaoStub.returns(when.resolve(null));

        homepageValidator._slugAlreadyExist(
                homepage,
                bim,
                schema.getSchema('homepage', 'object'),
                'slug'
            ).then(function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(homepage);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.isValid())
                    .to.be.true;

                expect(homepageDaoStub)
                    .to.have.been.called;

                homepageDaoStub.restore();

                done();
            });
    });

    it('_slugAlreadyExist() slug exist', function(done) {
        var homepage = {slug: 'stan'};
        var bim = new Bim();

        var homepageDaoStub = sinon.stub(homepageDao, 'findOneReadOnlyBySlug');

        homepageDaoStub.returns(when.resolve({
            slug: 'chuck'
        }));

        homepageValidator._slugAlreadyExist(
                homepage,
                bim,
                schema.getSchema('homepage', 'object'),
                'slug'
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

                    homepageDaoStub.restore();

                    done();
                });
    });

    it('validate() valid values', function(done) {
        var homepage = {
            slug            : 'unused_name',
            bio             : 'my bio'
        };
        homepageValidator.validate(
            homepage,
            'object'
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
            bio             : 'm'
        };
        homepageValidator.validate(
            homepage,
            'object'
        ).then(null, function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(homepage);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.hasErrorWithPath('slug'))
                    .to.be.true;

                expect(resolved.bim.hasErrorWithPath('bio'))
                    .to.be.true;

                expect(resolved.bim.isValid())
                    .to.be.false;

                done();
            });
    });
});
