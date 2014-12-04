var adapterProject  = require('../adapter').Project,
    expect          = require("chai").expect;

describe('adapter.project', function(){

    it('hateoasize() - Add HATEOAS data to object', function() {

        var project = {
            _id         : '534da334b9f6c07517f6cbb9',
            name        : 'My first project',
            slug        : 'my_first_project',
            createdAt   : Date.now
        };

        project = adapterProject.hateoasize(
            ['self', 'create', 'update', 'users', 'status'],
            project
        );

        expect(project)
            .to.have.property('links')
            .that.is.an('array');

        var self = project.links[0];

        expect(self)
            .to.have.property('rel')
            .to.equal('self');

        expect(self)
            .to.have.property('method')
            .to.equal('GET');

        expect(self)
            .to.have.property('href')
            .to.match(/\/project\/[0-9a-f]{24}$/);

        var create = project.links[1];

        expect(create)
            .to.have.property('rel')
            .to.equal('create');

        expect(create)
            .to.have.property('method')
            .to.equal('POST');

        expect(create)
            .to.have.property('href')
            .to.match(/\/project$/);

        var update = project.links[2];

        expect(update)
            .to.have.property('rel')
            .to.equal('update');

        expect(update)
            .to.have.property('method')
            .to.equal('PUT');

        expect(update)
            .to.have.property('href')
            .to.match(/\/project\/[0-9a-f]{24}$/);

        var users = project.links[3];

        expect(users)
            .to.have.property('rel')
            .to.equal('users');

        expect(users)
            .to.have.property('method')
            .to.equal('GET');

        expect(users)
            .to.have.property('href')
            .to.match(/\/project\/[0-9a-f]{24}\/users$/);

        var status = project.links[4];

        expect(status)
            .to.have.property('rel')
            .to.equal('status');

        expect(status)
            .to.have.property('method')
            .to.equal('GET');

        expect(status)
            .to.have.property('href')
            .to.match(/\/project\/[0-9a-f]{24}\/status$/);

    });
    
});
