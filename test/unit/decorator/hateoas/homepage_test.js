'use strict';

var expect          = require('chai').expect,
    homepageHateoas = require('../../../../src/decorator/hateoas').Homepage;

describe('decorator / hateoas / homepage', function() {
    it('Add HATEOAS details to the homepage object', function() {
        var initialHomepage = {
            _id         : '534da334b9f6c07517f6cbb9',
            slug        : 'stan',
            owner       : '434da334b9f6c07517f6cbb6'
        };

        var homepage = homepageHateoas(initialHomepage);

        expect(homepage)
            .to.have.property('links')
                .that.is.an('array');

        var self = homepage.links[0];

        expect(self)
            .to.have.property('rel')
                .to.equal('self');

        expect(self)
            .to.have.property('href')
            .to.match(/\/homepages\/stan$/);

        var owner = homepage.links[1];

        expect(owner)
            .to.have.property('rel')
            .to.equal('owner');

        expect(owner)
            .to.have.property('href')
            .to.match(/\/users\/434da334b9f6c07517f6cbb6$/);
    });
});
