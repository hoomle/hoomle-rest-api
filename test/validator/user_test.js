'use strict';

var Bim             = require('../../bim/bim'),
    errors          = require('../../validator/errors'),
    uservalidator   = require('../../validator/user'),
    schema          = require('../../validator/joi/schema'),
    expect          = require('chai').expect;

describe('user validate', function() {
    it('_emailAlreadyExist() email not exist', function(done) {
        var user = {email: 'unused_mail@provider.local'};
        var bim = new Bim();
        uservalidator._emailAlreadyExist(
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
        uservalidator._emailAlreadyExist(
                user,
                bim,
                schema.getSchema('user')
            ).then(null, function(resolved) {
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

    it('_usernameAlreadyExist() username not exist', function(done) {
        var user = {email: 'unused_username'};
        var bim = new Bim();
        uservalidator._usernameAlreadyExist(
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

    it('_usernameAlreadyExist() username exist', function(done) {
        var user = {username: 'stan'};
        var bim = new Bim();
        uservalidator._usernameAlreadyExist(
            user,
            bim,
            schema.getSchema('user')
        ).then(null, function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(user);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.errors[0].code)
                    .to.be.equals(errors.user.username_already_exist.code);

                expect(resolved.bim.errors[0].path)
                    .to.be.equals('username');

                expect(resolved.bim.errors[0].message)
                    .to.be.equals(errors.user.username_already_exist.message);

                expect(resolved.bim.isValid())
                    .to.be.false;

                done();
            });
    });

    it('validate() email not exist', function(done) {
        var user = {
            email:          'unused_mail@provider.local',
            password:       '1234',
            username:       'chuck',
            displayName:    'Chuck Norris',
            bio:            'My bio ...',
            location:       'Orléans'
        };
        var bim = new Bim();
        uservalidator.validate(
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
            username:       'c',
            displayName:    'C',
            bio:            'My bio ...',
            location:       'Orléans'
        };
        var bim = new Bim();
        uservalidator.validate(
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

                expect(resolved.bim.hasErrorWithPath('username'))
                    .to.be.true;

                expect(resolved.bim.hasErrorWithPath('displayName'))
                    .to.be.true;

                expect(resolved.bim.isValid())
                    .to.be.false;

                done();
            });
    });
});
