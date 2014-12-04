var adapterStatus   = require('../adapter').Status,
    expect          = require("chai").expect;

describe('adapter.status', function(){

    it('hateoasize() - Add HATEOAS data to object', function() {

        var status = {
            _id         : "534da334b9f6c07517f6cbb9",
            __v         : 1,
            content     : 'Content of status',
            date        : '2014-04-15T21:23:05.811Z',
            user        : '534da334b9f6c07517f6cbb9'
        };

        status = adapterStatus.hateoasize(['self'], status);

        expect(status)
            .to.have.property('links')
                .that.is.an('array');

        var self = status.links[0];

        expect(self)
            .to.have.property('rel')
                .to.equal('self');

        expect(self)
            .to.have.property('method')
                .to.equal('GET');

        expect(self)
            .to.have.property('href')
            .to.match(/\/status\/[0-9a-f]{24}$/);

    });

});