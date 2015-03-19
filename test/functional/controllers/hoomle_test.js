'use strict';

var request         = require('supertest'),
    expect          = require('chai').expect,
    tools           = require('../../tools'),
    app             = require('../mock.app.js'),
    loadFixtures    = require('../../fixtures.load');

describe('Hoomle controller', function() {
    before(function(done) {
        loadFixtures(done);
    });

    describe('GET /hoomle/{id}', function() {
        it('it is OK', function(done) {
            request(app)
                .get('/hoomle/stan')
                .expect('Content-Type', /json/)
                .expect(function(res) {
                    expect(res)
                        .to.have.property('body')
                        .that.is.an('object');

                    expect(res.body)
                        .to.be.deep.equals({
                            user: {
                                _id: '5478f34eb576b4a30295d914',
                                email: 'stanislas.chollet@gmail.com',
                                displayName: 'Stan Chollet',
                                createdAt: '2014-11-28T22:12:30.182Z'
                            },
                            homepage: {
                                _id: '5478f34eb576b4a30295d432',
                                slug: 'stan',
                                bio: 'Passionnate about travel, software development and sport.',
                                owner: '5478f34eb576b4a30295d914',
                                createdAt: '2014-11-28T22:12:30.182Z'
                            },
                            links: [
                                {
                                    rel: 'user',
                                    href: 'http://localhost:5001/users/5478f34eb576b4a30295d914'
                                }
                            ]
                        });
                })
                .expect(200, done);
        });

        it('Hoomle not found (404)', function(done) {
            request(app)
                .get('/Hoomle/5478f34eb576b4a302000000')
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404, done);
        });
    });

    describe('POST /hoomle', function() {
        it('it is OK', function(done) {
            request(app)
                .post('/hoomle')
                .set('Content-Type', 'application/json')
                .send({
                    email: 'chuck.norris@god.cloud',
                    password: '0000',
                    displayName: 'Chuck Norris',
                    slug: 'chuck'
                })
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }

                    expect(res.body)
                        .to.contain.keys('user', 'homepage', 'links');

                    expect(res.body.homepage)
                        .to.contain.keys('_id', 'slug', 'createdAt', 'createdAt');

                    expect(res.body.user)
                        .to.contain.keys('_id', 'email', 'displayName', 'createdAt');

                    expect(res.body.links[0])
                        .to.contain.keys('rel', 'href');

                    expect(res.body.links[0].rel)
                        .to.equal('user');

                    expect(res.body.homepage)
                        .to.not.contain.keys('__v');

                    expect(res.body.user)
                        .to.not.contain.keys('__v', 'password');

                    expect(res.body.homepage.slug)
                        .to.equal('chuck');

                    expect(res.body.user.email)
                        .to.equal('chuck.norris@god.cloud');

                    expect(res.body.user.displayName)
                        .to.equal('Chuck Norris');

                    return done();
                });
        });

        it('it is OK (dryrun)', function(done) {
            request(app)
                .post('/hoomle?dryrun')
                .set('Content-Type', 'application/json')
                .send({
                    email: 'chuck.norris.two@god.cloud',
                    password: '0000',
                    displayName: 'Chuck Norris',
                    slug: 'chucktwo'
                })
                .expect(204)
                .end(function(err) {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('it is OK (dryrun) with partial data', function(done) {
            request(app)
                .post('/hoomle?dryrun')
                .set('Content-Type', 'application/json')
                .send({
                    displayName: 'Chuck Norris'
                })
                .expect(204)
                .end(function(err) {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('Bad data', function(done) {
            request(app)
                .post('/hoomle')
                .set('Content-Type', 'application/json')
                .send({
                    slug: 's',
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

                    expect(tools.hasError(errors, 'string.min', 'slug'))
                        .to.be.true();

                    expect(tools.hasError(errors, 'string.email', 'email'))
                        .to.be.true();

                    expect(tools.hasError(errors, 'string.min', 'password'))
                        .to.be.true();

                    expect(tools.hasError(errors, 'string.min', 'displayName'))
                        .to.be.true();

                    return done();
                });
        });

        it('Bad data (dryrun) with partial data', function(done) {
            request(app)
                .post('/hoomle?dryrun')
                .set('Content-Type', 'application/json')
                .send({
                    email: 'chuck.nowrisse'
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

                    expect(errors.length)
                        .to.be.equals(1);

                    expect(tools.hasError(errors, 'string.email', 'email'))
                        .to.be.true();

                    return done();
                });
        });
    });
});
