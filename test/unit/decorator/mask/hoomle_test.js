'use strict';

var expect          = require('chai').expect,
    sinon           = require('sinon'),
    hoomleMask      = require('../../../../src/decorator/mask').Hoomle,
    homepageMask    = require('../../../../src/decorator/mask').Homepage,
    userMask        = require('../../../../src/decorator/mask').User;

describe('decorator / mask / hoomle', function() {
    it('Mask data from hoomle object', function() {
        var initialHoomle = {
            user: {
                email: 'chuck@god.io',
                password: '0000',
                displayName: 'Chuck',
                _id: '5509225625de00eaef33c85a',
                createdAt: '2015-03-18T06:59:34.039Z',
                __v: '000'
            },
            homepage: {
                slug: 'cloud',
                owner: '5509225625de00eaef33c85a',
                _id: '5509225625de00eaef33c85b',
                createdAt: '2015-03-18T06:59:34.041Z',
                __v: '000'
            }
        };

        var homepageMaskSpy = sinon.spy(homepageMask);
        var userMaskSpy = sinon.spy(userMask);

        hoomleMask(initialHoomle);

        expect(homepageMaskSpy).to.have.been.called;
        expect(userMaskSpy).to.have.been.called;
    });
});
