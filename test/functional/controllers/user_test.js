'use strict';

var request     = require('supertest'),
    expect      = require('chai').expect,
    app         = require('../mock.app.js');

describe('GET /users/{id}', function() {
    it('it is OK', function(done) {
        request(app)
            .get('/users/5478f34eb576b4a30295d914')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.be.deep.equals({
                        _id             : '5478f34eb576b4a30295d914',
                         email          : 'stanislas.chollet@gmail.com',
                        displayName     : 'Stan Chollet',
                        createdAt       : '2014-11-28T22:12:30.182Z'
                    });
            })
            .expect(200, done);
    });

    it('Bad format of ID (400)', function(done) {
        request(app)
            .get('/users/1234532')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Bad format of ID (404)', function(done) {
        request(app)
            .get('/users/5478f34eb576b4a302000000')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});
