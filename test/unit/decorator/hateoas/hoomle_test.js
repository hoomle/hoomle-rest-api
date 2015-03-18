'use strict';

var expect          = require('chai').expect,
    hoomleHateoas   = require('../../../../src/decorator/hateoas').Hoomle;

describe('decorator / hateoas / hoomle', function() {
    it('Add HATEOAS details to the hoomle object', function() {
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

        var hoomle = hoomleHateoas(initialHoomle);

        expect(hoomle)
            .to.have.property('links')
                .that.is.an('array');

        var user = hoomle.links[0];

        expect(user)
            .to.have.property('rel')
                .to.equal('user');

        expect(user)
            .to.have.property('href')
            .to.match(/\/users\/5509225625de00eaef33c85a$/);
    });
});
