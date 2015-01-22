'use strict';

var request     = require('supertest'),
    expect      = require('chai').expect,
    tools       = require('../../tools'),
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
                        createdAt       : '2014-11-28T22:12:30.182Z',
                        links           : [
                            {
                                href: 'http://localhost:5001/users/5478f34eb576b4a30295d914',
                                rel: 'self'
                            }
                        ]
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

    it('User not found (404)', function(done) {
        request(app)
            .get('/users/5478f34eb576b4a302000000')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});

describe('POST /users', function() {
    it('it is OK', function(done) {
        request(app)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send({
                email: 'chuck.nowrisse@gmail.com',
                password: '0000',
                displayName: 'Chuck Nowrisse'
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(res.body)
                    .to.contain.keys('_id', 'email', 'displayName', 'createdAt', 'links');

                expect(res.body)
                    .to.not.contain.keys('__v', 'password');

                expect(res.body.email)
                    .to.equal('chuck.nowrisse@gmail.com');

                expect(res.body.displayName)
                    .to.equal('Chuck Nowrisse');

                return done();
            });
    });

    it('Bad data', function(done) {
        request(app)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send({
                email: 'chuck.nowrisse',
                password: '0',
                displayName: 'C'
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(res.body)
                    .to.contain.keys('errors');

                var errors = res.body.errors;

                expect(tools.hasError(errors, 'string.email', 'email'))
                    .to.be.true();

                expect(tools.hasError(errors, 'string.min', 'password'))
                    .to.be.true();

                expect(tools.hasError(errors, 'string.min', 'displayName'))
                    .to.be.true();

                return done();
            });
    });
});
