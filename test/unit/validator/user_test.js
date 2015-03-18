'use strict';

var expect          = require('chai').expect,
    Bim             = require('../../../src/bim/bim'),
    errors          = require('../../../src/validator/errors'),
    userValidator   = require('../../../src/validator/user'),
    schema          = require('../../../src/validator/joi/schema'),
    sinon           = require('sinon'),
    when            = require('when'),
    userDao         = require('../../../src/manager/dao').User;

describe('validator / user', function() {
    it('_emailAlreadyExist() email not exist', function(done) {
        var user = {email: 'unused_mail@provider.local'};
        var bim = new Bim();

        var userDaoStub = sinon.stub(userDao, 'findOneReadOnlyByEmail');
        userDaoStub.returns(when.resolve(null));

        userValidator._emailAlreadyExist(
                user,
                bim,
                schema.getSchema('user', 'object'),
                'email'
            )
            .then(function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(user);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.isValid())
                    .to.be.true;

                userDaoStub.restore();

                done();
            });
    });

    it('_emailAlreadyExist() email exist', function(done) {
        var user = {email: 'stanislas.chollet@gmail.com'};
        var bim = new Bim();

        var userDaoStub = sinon.stub(userDao, 'findOneReadOnlyByEmail');
        userDaoStub.returns(when.resolve({email: 'stanislas.chollet@gmail.com'}));

        userValidator._emailAlreadyExist(
                user,
                bim,
                schema.getSchema('user', 'object'),
                'email'
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

                userDaoStub.restore();

                done();
            });
    });

    it('validate() email not exist', function(done) {
        var user = {
            email:          'unused_mail@provider.local',
            password:       '1234',
            displayName:    'Chuck Norris'
        };

        var userDaoStub = sinon.stub(userDao, 'findOneReadOnlyByEmail');
        userDaoStub.returns(when.resolve(null));

        userValidator.validate(
            user,
            'object'
        ).then(function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(user);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.isValid())
                    .to.be.true;

                userDaoStub.restore();

                done();
            });
    });

    it('validate() invalid values', function(done) {
        var user = {
            email:          'stanislas.chollet@gmail.com',
            password:       '1',
            displayName:    'C'
        };

        var userDaoStub = sinon.stub(userDao, 'findOneReadOnlyByEmail');
        userDaoStub.returns(when.resolve(user));

        userValidator.validate(
            user,
            'object'
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

                userDaoStub.restore();

                done();
            });
    });
});
