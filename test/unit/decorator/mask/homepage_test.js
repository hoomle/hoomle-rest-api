'use strict';

var expect          = require('chai').expect,
    homepageMask    = require('../../../../src/decorator/mask').Homepage;

describe('decorator / mask / homepage', function() {
    it('should mask data from homepage object', function() {
        var initialHomepage = {
            _id         : '534da334b9f6c07517f6cbb9',
            slug        : 'stan',
            owner       : '434da334b9f6c07517f6cbb6',
            __v         : '1234'
        };

        var homepage = homepageMask(initialHomepage);

        expect(homepage)
            .to.have.property('_id')
                .to.be.equals(initialHomepage._id);

        expect(homepage)
            .to.have.property('slug')
            .to.be.equals(initialHomepage.slug);

        expect(homepage)
            .to.have.property('owner')
            .to.be.equals(initialHomepage.owner);

        expect(homepage)
            .to.not.have.property('__v');
    });
});
