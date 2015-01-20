'use strict';

var request     = require('supertest'),
    expect      = require('chai').expect,
    tools       = require('../../tools'),
    app         = require('../mock.app.js');

describe('POST /oauth/access_token', function() {
    it('it is OK', function(done) {
        request(app)
            .post('/oauth/access_token')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                grant_type: 'password',
                username: 'stanislas.chollet@gmail.com',
                password: '0000',
                client_id: 'webapp',
                client_secret: 'secret'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(res.body)
                    .to.contain.keys('token_type', 'access_token', 'expires_in');

                expect(res.body.token_type)
                    .to.be.equals('bearer');

                return done();
            });
    });

    it('Bad credentials', function(done) {
        request(app)
            .post('/oauth/access_token')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                grant_type: 'password',
                username: 'stanislas.chollet@gmail.com',
                password: 'bad_password',
                client_id: 'webapp',
                client_secret: 'secret'
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(tools.hasError(res.body.errors, 'invalid_grant'))
                    .to.be.true();

                return done();
            });
    });
});
