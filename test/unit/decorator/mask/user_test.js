'use strict';

var expect          = require('chai').expect,
    userMask        = require('../../../../src/decorator/mask').User;

describe('decorator / mask / user', function() {
    it('Mask data from user object', function() {
        var initialUser = {
            _id         : '534da334b9f6c07517f6cbb9',
            email       : 'chuck.norris@god.com',
            __v         : '1234',
            password    : 'secretpassword'
        };

        var user = userMask(initialUser);

        expect(user)
            .to.have.property('_id')
                .to.be.equals(initialUser._id);

        expect(user)
            .to.have.property('email')
            .to.be.equals(initialUser.email);

        expect(user)
            .to.not.have.property('__v');

        expect(user)
            .to.not.have.property('password');
    });
});
