var adapterUsers    = require('../adapter').User,
    expect          = require("chai").expect;

describe('adapter.users', function(){

    it('hateoasize() - Add HATEOAS data to object', function() {

        var user = {
            _id         : "534da334b9f6c07517f6cbb9",
            email       : 'chuck.norris@god.com'
        };

        user = adapterUsers.hateoasize(['self', 'status'], user);

        expect(user)
            .to.have.property('links')
                .that.is.an('array');

        var self = user.links[0];

        expect(self)
            .to.have.property('rel')
                .to.equal('self');

        expect(self)
            .to.have.property('method')
                .to.equal('GET');

        expect(self)
            .to.have.property('href')
            .to.match(/\/users\/[0-9a-f]{24}$/);

        var status = user.links[1];

        expect(status)
            .to.have.property('rel')
            .to.equal('status');

        expect(status)
            .to.have.property('method')
            .to.equal('GET');

        expect(status)
            .to.have.property('href')
            .to.match(/\/users\/[0-9a-f]{24}\/status$/);

    });

});