var request     = require('supertest'),
    testTools   = require('./tools'),
    app         = require('./mock.app'),
    expect      = require('chai').expect,
    errors      = require('../validator/errors');

describe('GET /me', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/me')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .expect('Content-Type', /json/)
            .expect(function(res) {

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('email')
                    .to.equal('chuck@norris.com');

                expect(res.body)
                    .to.have.property('links');

                expect(res.body)
                    .to.have.property('_id')
                    .to.equal('53584239a1294f5a24940590');

            })
            .expect(200, done);
    });

    it('Not authorized to access this data (Unauthorized)', function(done) {
        request(app)
            .get('/me')
            .expect(401, done);
    });

});

describe('GET /users/:id', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/users/53584239a1294f5a24940590')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .expect('Content-Type', /json/)
            .expect(function(res) {
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('email')
                    .to.equal('chuck@norris.com');
                    
                expect(res.body)
                    .to.have.property('links');
                    
                expect(res.body)
                    .to.have.property('_id')
                    .to.equal('53584239a1294f5a24940590');
                    
            })
            .expect(200, done);
    });

    it('Not authorized to access this data (Unauthorized)', function(done) {
        request(app)
            .get('/users/53584239a1294f5a24940590')
            .expect(401, done);
    });
    
    it("User doesn't exist (Not found)", function(done) {
        request(app)
            .get('/users/12584239a1294f5a24940590')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .expect(404)
            .end(function(err, res) {
                
                if (err) {
                    return done(err);
                }
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.user.not_found.message);
                    
                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.user.not_found.code);
                    
                return done();
            });
    });
    
    it("ID's format is not good (Bad Request)", function(done) {
        request(app)
            .get('/users/1234')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .expect(400)
            .end(function(err, res) {
                
                if (err) {
                    return done(err);
                }
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.string.documentid_bad_format.message);
                    
                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.string.documentid_bad_format.code);
                    
                return done();
            });
    });

});

describe('POST /users', function() {

    it('Password is too short', function(done) {
        
        request(app)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send({ password: 'my', password_confirm: 'my', email: 'chuck@crosoft.com'})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                
                if (err) {
                    return done(err);
                }
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.user.password_length_too_short.message);
                    
                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.user.password_length_too_short.code);
                    
                return done();
            });
    });
    
    it('Password is too long', function(done) {
        
        request(app)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send({ password: 'azertyuiopqsdfgh', password_confirm: 'azertyuiopqsdfgh', email: 'chuck@crosoft.com'})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                
                if (err) {
                    return done(err);
                }
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.user.password_length_too_long.message);
                    
                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.user.password_length_too_long.code);
                    
                return done();
            });
    });

    it('Password and his confirmation are not the same', function(done) {
        
        request(app)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send({ password: 'myPassword', password_confirm: 'myPass', email: 'chuck@crosoft.com'})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                
                if (err) {
                    return done(err);
                }
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.user.password_confirmation_fail.message);
                    
                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.user.password_confirmation_fail.code);
                    
                return done();
            });
    });
    
    it('Email already exist', function(done) {
        
        request(app)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send({ password: 'myPassword', password_confirm: 'myPassword', email: 'chuck@norris.com'})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                
                if (err) {
                    return done(err);
                }
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.user.email_already_exist.message);
                    
                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.user.email_already_exist.code);
                    
                return done();
            });
    });
    
    it('Email format is not good', function(done) {
        
        request(app)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send({ password: 'myPassword', password_confirm: 'myPassword', email: 'chuck@norris'})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                
                if (err) {
                    return done(err);
                }
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.string.email_bad_format.message);
                    
                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.string.email_bad_format.code);
                    
                return done();
            });
    });
    
    it('It is OK', function(done) {
        
        request(app)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send({ password: 'myPassword', password_confirm: 'myPassword', email: 'chuck@god.com'})
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {
                
                if (err) {
                    return done(err);
                }
                
                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');
                
                expect(res.body)
                    .to.have.property('email')
                    .to.equal('chuck@god.com');
                    
                expect(res.body)
                    .to.have.property('_id');
                    
                expect(res.body)
                    .to.have.property('links');
                    
                return done();
            });
    });

});

describe('PUT /me', function() {

    it('Password is too short', function(done) {
        request(app)
            .put('/me')
            .set('Content-Type', 'application/json')
            .set('Authorization', testTools.buildBasicAuthorization('put_user@mail.com', 'put_user@mail.com'))
            .send({ password: 'my', password_confirm: 'my'})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {

                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.user.password_length_too_short.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.user.password_length_too_short.code);

                return done();
            });
    });

    it('Password is too long', function(done) {
        request(app)
            .put('/me')
            .set('Content-Type', 'application/json')
            .set('Authorization', testTools.buildBasicAuthorization('put_user@mail.com', 'put_user@mail.com'))
            .send({ password: 'azertyuiopqsdfgh', password_confirm: 'azertyuiopqsdfgh' })
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {

                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.user.password_length_too_long.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.user.password_length_too_long.code);

                return done();
            });
    });

    it('Password and his confirmation are not the same', function(done) {
        request(app)
            .put('/me')
            .set('Content-Type', 'application/json')
            .set('Authorization', testTools.buildBasicAuthorization('put_user@mail.com', 'put_user@mail.com'))
            .send({ password: 'myPassword', password_confirm: 'myPass' })
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {

                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.user.password_confirmation_fail.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.user.password_confirmation_fail.code);

                return done();
            });
    });

    it('Email already exist', function(done) {
        request(app)
            .put('/me')
            .set('Content-Type', 'application/json')
            .set('Authorization', testTools.buildBasicAuthorization('put_user@mail.com', 'put_user@mail.com'))
            .send({ email: 'chuck@norris.com'})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {

                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.user.email_already_exist.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.user.email_already_exist.code);

                return done();
            });
    });

    it('Email format is not good', function(done) {
        request(app)
            .put('/me')
            .set('Content-Type', 'application/json')
            .set('Authorization', testTools.buildBasicAuthorization('put_user@mail.com', 'put_user@mail.com'))
            .send({ email: 'chuck@norris'})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {

                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.string.email_bad_format.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.string.email_bad_format.code);

                return done();
            });
    });

    it('Not authorized to access this data (Unauthorized)', function(done) {
        request(app)
            .put('/me')
            .expect(401, done);
    });

    describe('It is ok', function() {

        it('It is ok (email)', function() {
            request(app)
                .put('/me')
                .set('Content-Type', 'application/json')
                .set('Authorization', testTools.buildBasicAuthorization('put_user@mail.com', 'put_user@mail.com'))
                .send({ email: 'put_user_updated@mail.com'})
                .expect('Content-Type', /json/)
                .expect(function(res) {

                    expect(res)
                        .to.have.property('body')
                        .that.is.an('object');

                    expect(res.body)
                        .to.have.property('email')
                        .to.equal('put_user_updated@mail.com');

                    expect(res.body)
                        .to.have.property('links');

                    expect(res.body)
                        .to.have.property('_id')
                        .to.equal('53584239a1294f5a24940594');

                })
                .expect(200);
        });

        it('It is ok (password)', function() {
            request(app)
                .put('/me')
                .set('Content-Type', 'application/json')
                .set('Authorization', testTools.buildBasicAuthorization('put_user_updated@mail.com', 'put_user_updated@mail.com'))
                .send({ password: 'put_user_updated@mail.com', password_confirm: 'put_user_updated@mail.com' })
                .expect('Content-Type', /json/)
                .expect(function(res) {

                    expect(res)
                        .to.have.property('body')
                        .that.is.an('object');

                    expect(res.body)
                        .to.have.property('email')
                        .to.equal('put_user_updated@mail.com');

                    expect(res.body)
                        .to.have.property('links');

                    expect(res.body)
                        .to.have.property('_id')
                        .to.equal('53584239a1294f5a24940594');

                })
                .expect(200);
        });

    });

});

describe('GET /project/:id/users', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/project/53584239a1294f5a24940391/users')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                var body = res.body;

                expect(body)
                    .to.have.property('data')
                    .that.is.an('array');

                expect(body.data.length)
                    .to.equal(2);

                user1 = body.data[0];

                expect(user1)
                    .to.contain.keys('_id', 'email', 'links');

                expect(user1)
                    .to.not.contain.keys('__v');

                expect(user1.email)
                    .to.equal('chuck@norris.com');

            })
            .expect(200, done);
    });

    it("Project's ID format is not good (Bad Request)", function(done) {
        request(app)
            .get('/project/239a1294f5a24940591/users')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Project not found', function(done) {
        request(app)
            .get('/project/aaa84239a1294f5a24940390/users')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

    it('Unauthorized (without credentials)', function(done) {
        request(app)
            .get('/project/53584239a1294f5a24940390/users')
            .set('Content-Type', 'application/json')
            .expect(401, done);
    });

});

describe('POST /project/:id/users', function() {

    it('User not found', function(done) {
        request(app)
            .post('/project/53584239a1294f5a24940395/users')
            .set('Authorization', testTools.buildBasicAuthorization('push_user_to_project@mail.com', 'push_user_to_project@mail.com'))
            .set('Content-Type', 'application/json')
            .send({ user: 'aaa84239a1294f5a24940598' })
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.user.not_found.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.user.not_found.code);

                return done();
            });
    });

    it('User already assigned', function(done) {
        request(app)
            .post('/project/53584239a1294f5a24940395/users')
            .set('Authorization', testTools.buildBasicAuthorization('push_user_to_project@mail.com', 'push_user_to_project@mail.com'))
            .set('Content-Type', 'application/json')
            .send({ user: '53584239a1294f5a24940597' })
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.project.user_already_assigned.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.project.user_already_assigned.code);

                return done();
            });
    });

    it('Project not found', function(done) {
        request(app)
            .post('/project/aaa84239a1294f5a24940395/users')
            .set('Authorization', testTools.buildBasicAuthorization('push_user_to_project@mail.com', 'push_user_to_project@mail.com'))
            .set('Content-Type', 'application/json')
            .send({ user: '53584239a1294f5a24940598' })
            .expect(404)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.project.not_found.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.project.not_found.code);

                return done();
            });
    });

    it("ID's format is not good (Bad Request)", function(done) {
        request(app)
            .post('/project/1234/users')
            .set('Authorization', testTools.buildBasicAuthorization('push_user_to_project@mail.com', 'push_user_to_project@mail.com'))
            .set('Content-Type', 'application/json')
            .send({ user: '53584239a1294f5a24940598' })
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.string.documentid_bad_format.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.string.documentid_bad_format.code);

                return done();
            });
    });

    it('Requester is not the owner', function(done) {
        request(app)
            .post('/project/53584239a1294f5a24940395/users')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .send({ user: '53584239a1294f5a24940598' })
            .expect(403)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.project.not_owner.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.project.not_owner.code);

                return done();
            });
    });

    it('It is ok', function(done) {
        request(app)
            .post('/project/53584239a1294f5a24940395/users')
            .set('Authorization', testTools.buildBasicAuthorization('push_user_to_project@mail.com', 'push_user_to_project@mail.com'))
            .set('Content-Type', 'application/json')
            .send({ user: '53584239a1294f5a24940598' })
            .expect(200, done);
    });

});

describe('DELETE /project/:id/users/:idUser', function() {

    it('User not found', function(done) {
        request(app)
            .delete('/project/53584239a1294f5a24940396/users/aaa84239a1294f5a24940599')
            .set('Authorization', testTools.buildBasicAuthorization('remove_user_from_project@mail.com', 'remove_user_from_project@mail.com'))
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.user.not_found.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.user.not_found.code);

                return done();
            });
    });

    it('User not assigned', function(done) {
        request(app)
            .delete('/project/53584239a1294f5a24940396/users/53584239a1294f5a24940590')
            .set('Authorization', testTools.buildBasicAuthorization('remove_user_from_project@mail.com', 'remove_user_from_project@mail.com'))
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.project.user_not_assigned.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.project.user_not_assigned.code);

                return done();
            });
    });

    it('Project not found', function(done) {
        request(app)
            .delete('/project/aaa84239a1294f5a24940396/users/53584239a1294f5a24940590')
            .set('Authorization', testTools.buildBasicAuthorization('remove_user_from_project@mail.com', 'remove_user_from_project@mail.com'))
            .expect(404)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.project.not_found.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.project.not_found.code);

                return done();
            });
    });

    it("ID's format is not good (Bad Request, Project)", function(done) {
        request(app)
            .delete('/project/1234/users/53584239a1294f5a24940590')
            .set('Authorization', testTools.buildBasicAuthorization('remove_user_from_project@mail.com', 'remove_user_from_project@mail.com'))
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.string.documentid_bad_format.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.string.documentid_bad_format.code);

                return done();
            });
    });

    it("ID's format is not good (Bad Request, User)", function(done) {
        request(app)
            .delete('/project/53584239a1294f5a24940396/users/1234')
            .set('Authorization', testTools.buildBasicAuthorization('remove_user_from_project@mail.com', 'remove_user_from_project@mail.com'))
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.string.documentid_bad_format.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.string.documentid_bad_format.code);

                return done();
            });
    });

    it('Requester is not the owner', function(done) {
        request(app)
            .delete('/project/53584239a1294f5a24940396/users/53584239a1294f5a24940601')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .expect(403)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.project.not_owner.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.project.not_owner.code);

                return done();
            });
    });

    it('It is OK', function(done) {
        request(app)
            .delete('/project/53584239a1294f5a24940396/users/53584239a1294f5a24940601')
            .set('Authorization', testTools.buildBasicAuthorization('remove_user_from_project@mail.com', 'remove_user_from_project@mail.com'))
            .expect(200, done);
    });

});