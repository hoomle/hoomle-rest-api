'use strict';

var expect          = require('chai').expect,
    arrayHelper     = require('../../../src/helpers/array');

describe('helpers / array', function() {
    it('pushToPropertyUnknow() - Push object to property (array) of an object', function() {
        var testObject = {};

        expect(testObject)
            .to.not.have.property('links');

        arrayHelper.pushToPropertyUnknow(testObject, 'links', {test: 'value'});

        expect(testObject)
            .to.have.property('links')
            .to.be.an('array');

        expect(testObject.links[0])
            .to.be.an('object')
            .to.include.keys('test');
    });
});
