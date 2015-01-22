'use strict';

var expect          = require('chai').expect,
    decorator       = require('../../../src/decorator');

describe('decorator / index', function() {
    it('decorate() with no decorators', function() {
        var user = {
            _id         : '534da334b9f6c07517f6cbb9',
            email       : 'chuck.norris@god.com'
        };

        var userDecorate = decorator.decorate(user);

        expect(user)
            .to.be.deep.equals(userDecorate);
    });

    it('decorate() with empty list of decorators', function() {
        var user = {
            _id         : '534da334b9f6c07517f6cbb9',
            email       : 'chuck.norris@god.com'
        };

        var userDecorate = decorator.decorate(user, []);

        expect(user)
            .to.be.deep.equals(userDecorate);
    });

    it('decorate() with simple decorator', function() {
        var initialUser = {
            _id         : '534da334b9f6c07517f6cbb9',
            email       : 'chuck.norris@god.com'
        };

        var oneDecorator = function(data) {
            data.firstName = 'chuck';
            return data;
        };

        var user = decorator.decorate(initialUser, [oneDecorator]);

        expect(user)
            .to.have.property('_id')
            .to.be.equals(initialUser._id);

        expect(user)
            .to.have.property('email')
            .to.be.equals(initialUser.email);

        expect(user)
            .to.have.property('firstName')
            .to.be.equals('chuck');
    });
});
