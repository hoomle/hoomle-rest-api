var objectHelper    = require('../helpers/object'),
    expect          = require("chai").expect;

describe('helpers.object', function(){

    it('removeProperties() - Remove properties from object', function() {

        var testObject = {
            property1: 'value',
            property2: 'value',
            property3: 'value',
            property4: 'value'
        };

        expect(testObject)
            .to.have.property('property1');

        expect(testObject)
            .to.have.property('property2');

        expect(testObject)
            .to.have.property('property3');

        expect(testObject)
            .to.have.property('property4');

        objectHelper.removeProperties(['property2', 'property4'], testObject);

        expect(testObject)
            .to.have.property('property1');

        expect(testObject)
            .to.not.have.property('property2');

        expect(testObject)
            .to.have.property('property3');

        expect(testObject)
            .to.not.have.property('property4');
    });

    it('areEqual() - Check if 2 object are equal', function() {

        var r;

        r = expect(objectHelper.areEqual(
            { prop1: 'value1', prop2: 'value2' },
            { prop2: 'value2', prop1: 'value1' }
        )).to.be.true;

        r = expect(objectHelper.areEqual(
            { prop1: 'value1', prop2: 'value2' },
            { prop1: 'value1', prop2: 'value2' }
        )).to.be.true;

        r = expect(objectHelper.areEqual(
            { prop1: 'value1', prop2: 'value2' },
            { prop1: 'value0', prop2: 'value2' }
        )).to.be.false;

        r = expect(objectHelper.areEqual(
            { prop1: 'value1', prop2: 'value2' },
            { prop1: 'value1', prop2: 'value2', prop3: 'value3' }
        )).to.be.false;

        r = expect(objectHelper.areEqual(
            { prop1: 'value1', prop2: 'value2', prop3: function(x) { return x * x; } },
            { prop1: 'value1', prop2: 'value2', prop3: function(x) { return x * x; } }
        )).to.be.true;

        r = expect(objectHelper.areEqual(
            { prop1: 'value1', prop2: 'value2', prop3: function(x) { return x * x; } },
            { prop3: function(x) { return x * x; }, prop1: 'value1', prop2: 'value2' }
        )).to.be.true;

    });

});