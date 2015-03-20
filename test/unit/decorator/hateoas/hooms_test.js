'use strict';

var expect          = require('chai').expect,
    hoomsHateoas    = require('../../../../src/decorator/hateoas').Hooms;

describe('decorator / hateoas / hooms', function() {
    it('Add HATEOAS details to the hooms object', function() {
        var initialHoomle = {
            user: {
                email: 'chuck@god.com',
                displayName: 'Chuck',
                _id: '5509225625de00eaef33c85a',
                createdAt: '2015-03-18T06:59:34.039Z'
            },
            homepage: {
                slug: 'cloud',
                owner: '5509225625de00eaef33c85a',
                _id: '5509225625de00eaef33c85b',
                createdAt: '2015-03-18T06:59:34.041Z'
            }
        };

        var hooms = hoomsHateoas(initialHoomle);

        expect(hooms)
            .to.have.property('links')
                .that.is.an('array');

        var user = hooms.links[0];

        expect(user)
            .to.have.property('rel')
                .to.equal('user');

        expect(user)
            .to.have.property('href')
            .to.match(/\/users\/5509225625de00eaef33c85a$/);
    });
});
