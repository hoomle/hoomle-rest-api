'use strict';

var expect          = require('chai').expect,
    Bim             = require('../../../src/bim/bim'),
    errors          = require('../../../src/validator/errors'),
    userValidator   = require('../../../src/validator/user'),
    schema          = require('../../../src/validator/joi/schema'),
    loadFixtures    = require('../../fixtures.load');

describe('validator / user', function() {
    before(function(done) {
        loadFixtures(done);
    });

    it('_emailAlreadyExist() email not exist', function(done) {
        var user = {email: 'unused_mail@provider.local'};
        var bim = new Bim();
        userValidator._emailAlreadyExist(
                user,
                bim,
                schema.getSchema('user', 'default')
            )
            .then(function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(user);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.isValid())
                    .to.be.true;

                done();
            });
    });

    it('_emailAlreadyExist() email exist', function(done) {
        var user = {email: 'stanislas.chollet@gmail.com'};
        var bim = new Bim();
        userValidator._emailAlreadyExist(
                user,
                bim,
                schema.getSchema('user')
            ).then(function(obj) {
                console.log(obj);
            }, function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(user);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.errors[0].code)
                    .to.be.equals(errors.user.email_already_exist.code);

                expect(resolved.bim.errors[0].path)
                    .to.be.equals('email');

                expect(resolved.bim.errors[0].message)
                    .to.be.equals(errors.user.email_already_exist.message);

                expect(resolved.bim.isValid())
                    .to.be.false;

                done();
            });
    });

    it('validate() email not exist', function(done) {
        var user = {
            email:          'unused_mail@provider.local',
            password:       '1234',
            displayName:    'Chuck Norris'
        };
        var bim = new Bim();
        userValidator.validate(
            user,
            bim,
            schema.getSchema('user')
        ).then(function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(user);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.isValid())
                    .to.be.true;

                done();
            });
    });

    it('validate() invalid values', function(done) {
        var user = {
            email:          'stanislas.chollet@gmail.com',
            password:       '1',
            displayName:    'C'
        };
        var bim = new Bim();
        userValidator.validate(
            user,
            bim,
            schema.getSchema('user')
        ).then(null, function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(user);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.hasErrorWithPath('email'))
                    .to.be.true;

                expect(resolved.bim.hasErrorWithPath('password'))
                    .to.be.true;

                expect(resolved.bim.hasErrorWithPath('displayName'))
                    .to.be.true;

                expect(resolved.bim.isValid())
                    .to.be.false;

                done();
            });
    });
});
