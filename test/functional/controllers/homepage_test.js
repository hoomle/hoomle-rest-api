'use strict';

var request     = require('supertest'),
    expect      = require('chai').expect,
    tools       = require('../../tools'),
    app         = require('../mock.app.js');

describe('GET /homepage/{id}', function() {
    it('it is OK', function(done) {
        request(app)
            .get('/homepage/stan')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.be.deep.equals({
                        _id             : '5478f34eb576b4a30295d432',
                        slug            : 'stan',
                        bio             : 'Passionnate about travel, software development and sport.',
                        location        : 'Paris, France',
                        owner           : '5478f34eb576b4a30295d914',
                        createdAt       : '2014-11-28T22:12:30.182Z',
                        links           : [
                            {
                                href: 'http://localhost:5001/homepages/stan',
                                rel: 'self'
                            },
                            {
                                href: 'http://localhost:5001/users/5478f34eb576b4a30295d914',
                                rel: 'owner'
                            }
                        ]
                    });
            })
            .expect(200, done);
    });

    it('Homepage not found (404)', function(done) {
        request(app)
            .get('/homepage/5478f34eb576b4a302000000')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});

describe('POST /homepage', function() {
    it('it is OK', function(done) {
        request(app)
            .post('/homepage')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer d615403c12dc5b8ca2e9c5491278e1508fc5aee0')
            .send({
                slug: 'new_homepage',
                bio: 'Passionnate about travel, sport and development',
                location: 'Paris, France'
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(res.body)
                    .to.contain.keys('_id', 'slug', 'createdAt', 'bio', 'location', 'links');

                expect(res.body)
                    .to.not.contain.keys('__v');

                expect(res.body.slug)
                    .to.equal('new_homepage');

                expect(res.body.bio)
                    .to.equal('Passionnate about travel, sport and development');

                return done();
            });
    });

    it('Bad data', function(done) {
        request(app)
            .post('/homepage')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer d615403c12dc5b8ca2e9c5491278e1508fc5aee0')
            .send({
                slug: 's',
                bio: 'P',
                location: 'P'
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

                expect(tools.hasError(errors, 'string.min', 'bio'))
                    .to.be.true();

                expect(tools.hasError(errors, 'string.min', 'location'))
                    .to.be.true();

                return done();
            });
    });

    it('Unauthorized', function(done) {
        request(app)
            .post('/homepage')
            .set('Content-Type', 'application/json')
            .send({
                slug: 's',
                bio: 'P',
                location: 'P'
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

                expect(tools.hasError(errors, 'invalid_request'))
                    .to.be.true();

                return done();
            });
    });
});
