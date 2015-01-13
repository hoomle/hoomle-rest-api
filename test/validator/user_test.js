'use strict';

var Bim             = require('../../bim/bim'),
    errors          = require('../../validator/errors'),
    uservalidator   = require('../../validator/user'),
    schema          = require('../../validator/joi/schema'),
    expect          = require('chai').expect;

describe('user validate', function() {
    it('_userAlreadyExist() email not exist', function(done) {
        var user = {email: 'unused_mail@provider.local'};
        var bim = new Bim();
        uservalidator._userAlreadyExist(
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

    it('_userAlreadyExist() email exist', function(done) {
        var user = {email: 'stanislas.chollet@gmail.com'};
        var bim = new Bim();
        uservalidator._userAlreadyExist(
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
});
