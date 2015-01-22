'use strict';

var expect          = require('chai').expect,
    userHateoas     = require('../../../../src/decorator/hateoas').User;

describe('decorator / hateoas / user', function() {
    it('Add HATEOAS details to the user object', function() {
        var initialUser = {
            _id         : '534da334b9f6c07517f6cbb9',
            email       : 'chuck.norris@god.com'
        };

        var user = userHateoas(initialUser);

        expect(user)
            .to.have.property('links')
                .that.is.an('array');

        var self = user.links[0];

        expect(self)
            .to.have.property('rel')
                .to.equal('self');

        expect(self)
            .to.have.property('href')
            .to.match(/\/users\/534da334b9f6c07517f6cbb9$/);
    });
});
