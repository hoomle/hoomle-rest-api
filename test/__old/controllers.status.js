var request     = require('supertest'),
    testTools   = require('./tools'),
    app         = require('./mock.app'),
    expect      = require('chai').expect,
    errors      = require('../validator/errors');

describe('GET /users/:id/status', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/users/53584239a1294f5a24940590/status')
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
                    .to.equal(3);
                 
                status1 = body.data[0]; 
                    
                expect(status1)
                    .to.contain.keys('_id', 'content', 'owner', 'createdAt', 'project', 'links');
                    
                expect(status1)
                    .to.not.contain.keys('__v');
                    
                expect(status1.content)
                    .to.equal('there are somebody here ?');
                    
            })
            .expect(200, done);
    });

    it('Not authorized to access this data (Unauthorized)', function(done) {
        request(app)
            .get('/users/53584239a1294f5a24940590/status')
            .expect(401, done);
    });
    
    it("User doesn't exist (Not found)", function(done) {
        request(app)
            .get('/users/12584239a1294f5a24940590/status')
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
                    .to.equal(errors.user.not_found.message);
                    
                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.user.not_found.code);
                    
                return done();
            });
    });
    
    it("User ID's format is not good (Bad Request)", function(done) {
        request(app)
            .get('/users/1234/status')
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

describe('GET /me/status', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/me/status')
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
                    .to.equal(3);

                status1 = body.data[0];

                expect(status1)
                    .to.contain.keys('_id', 'content', 'owner', 'createdAt', 'project', 'links');

                expect(status1)
                    .to.not.contain.keys('__v');

                expect(status1.content)
                    .to.equal('there are somebody here ?');

            })
            .expect(200, done);
    });

    it('Not authorized to access this data (Unauthorized)', function(done) {
        request(app)
            .get('/me/status')
            .expect(401, done);
    });

});

describe('GET /status/:id', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/status/53584239a1294f5a24940690')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                
                expect(res.body)
                    .to.contain.keys('_id', 'content', 'owner', 'createdAt', 'links');
                    
                expect(res.body)
                    .to.not.contain.keys('__v');
                    
                expect(res.body.content)
                    .to.equal('I begin my first project');
                    
            })
            .expect(200, done);
    });

    it("ID's format is not good (Bad Request)", function(done) {
        request(app)
            .get('/status/1234')
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
    
    it("Status not found", function(done) {
        request(app)
            .get('/status/aaa84239a1294f5a24940690')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
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
                    .to.equal(errors.status.not_found.message);
                    
                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.status.not_found.code);
                    
                return done();
            });
    });
    
    it('Not authorized to access this data (Unauthorized)', function(done) {
        request(app)
            .get('/status/53584239a1294f5a24940690')
            .set('Content-Type', 'application/json')
            .expect(401, done);
    });

    it('Not authorized to access this data (User not belong to project)', function(done) {
        request(app)
            .get('/status/53584239a1294f5a24940691')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
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
                    .to.equal(errors.project.user_not_belong.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.project.user_not_belong.code);

                return done();
            });
    });

});

describe('GET /project/:id/status', function() {

    it('it is OK', function(done) {
        request(app)
            .get('/project/53584239a1294f5a24940390/status')
            .set('Authorization', testTools.buildBasicAuthorization('mark.nuremberg@mail.com', 'mark.nuremberg@mail.com'))
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

                status1 = body.data[0];

                expect(status1)
                    .to.contain.keys('_id', 'content', 'owner', 'createdAt', 'project', 'links');

                expect(status1)
                    .to.not.contain.keys('__v');

                expect(status1.content)
                    .to.equal('there are somebody here ?');

            })
            .expect(200, done);
    });

    it("Project's ID format is not good (Bad Request)", function(done) {
        request(app)
            .get('/project/1234')
            .set('Authorization', testTools.buildBasicAuthorization('mark.nuremberg@mail.com', 'mark.nuremberg@mail.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('Project not found', function(done) {
        request(app)
            .get('/project/aaa84239a1294f5a24940390')
            .set('Authorization', testTools.buildBasicAuthorization('mark.nuremberg@mail.com', 'mark.nuremberg@mail.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

    it('Unauthorized (without credentials)', function(done) {
        request(app)
            .get('/project/53584239a1294f5a24940390/status')
            .set('Content-Type', 'application/json')
            .expect(401, done);
    });

    it('Unauthorized (not rights on this project)', function(done) {
        request(app)
            .get('/project/53584239a1294f5a24940390/status')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(403, done);
    });

});

describe('POST /status', function() {

    it('Content length is too short', function(done) {
        request(app)
            .post('/status')
            .set('Authorization', testTools.buildBasicAuthorization('larry@mail.com', 'larry@mail.com'))
            .set('Content-Type', 'application/json')
            .send({ content: '' })
            // .expect('Content-Type', /json/)
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
                    .to.equal(errors.status.content_bad_format.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.status.content_bad_format.code);

                return done();
            });
    });

    it('Content length is too long', function(done) {

        var length301 =
            'azertyuiopazertyuiopazertyuiopazertyuiopazertyuiopazertyuiopazertyuiopazertyuiopazertyuiopazertyuiop' +
            'azertyuiopazertyuiopazertyuiopazertyuiopazertyuiopazertyuiopazertyuiopazertyuiopazertyuiopazertyuiop' +
            'azertyuiopazertyuiopazertyuiopazertyuiopazertyuiopazertyuiopazertyuiopazertyuiopazertyuiopazertyuiop' +
            'a';

        request(app)
            .post('/status')
            .set('Authorization', testTools.buildBasicAuthorization('larry@mail.com', 'larry@mail.com'))
            .set('Content-Type', 'application/json')
            .send({ content: length301 })
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
                    .to.equal(errors.status.content_bad_format.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.status.content_bad_format.code);

                return done();
            });
    });

    it('Bad project ID', function(done) {
        request(app)
            .post('/status')
            .set('Authorization', testTools.buildBasicAuthorization('larry@mail.com', 'larry@mail.com'))
            .set('Content-Type', 'application/json')
            .send({ content: 'Hello everyone !', project: '1234' })
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
                    .to.equal(errors.string.documentid_bad_format.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.string.documentid_bad_format.code);

                return done();
            });
    });

    it('Not authorized to access this data (Unauthorized)', function(done) {
        request(app)
            .post('/status')
            .set('Content-Type', 'application/json')
            .send({})
            .expect(401, done);
    });

    it('It is OK (without project)', function(done) {
        request(app)
            .post('/status')
            .set('Authorization', testTools.buildBasicAuthorization('larry@mail.com', 'larry@mail.com'))
            .set('Content-Type', 'application/json')
            .send({ content: 'Hello everyone !' })
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {

                if (err) {
                    return done(err);
                }

                expect(res.body)
                    .to.contain.keys('_id', 'content', 'owner', 'createdAt', 'links');

                expect(res.body)
                    .to.not.contain.keys('__v');

                expect(res.body.content)
                    .to.equal('Hello everyone !');

                return done();
            });
    });

    it('It is OK (with project)', function(done) {
        request(app)
            .post('/status')
            .set('Authorization', testTools.buildBasicAuthorization('larry@mail.com', 'larry@mail.com'))
            .set('Content-Type', 'application/json')
            .send({ content: 'Hello everyone !', project: '53584239a1294f5a24940392' })
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {

                if (err) {
                    return done(err);
                }

                expect(res.body)
                    .to.contain.keys('_id', 'content', 'owner', 'project', 'createdAt', 'links');

                expect(res.body)
                    .to.not.contain.keys('__v');

                expect(res.body.content)
                    .to.equal('Hello everyone !');

                return done();
            });
    });

    it('The user does not belong to the project', function(done) {
        request(app)
            .post('/status')
            .set('Authorization', testTools.buildBasicAuthorization('chuck@norris.com', 'chuck@norris.com'))
            .set('Content-Type', 'application/json')
            .send({ content: 'Hello everyone !', project: '53584239a1294f5a24940392' })
            .expect('Content-Type', /json/)
            .expect(401)
            .end(function(err, res) {

                if (err) {
                    return done(err);
                }

                expect(res)
                    .to.have.property('body')
                    .that.is.an('object');

                expect(res.body)
                    .to.have.property('message')
                    .to.equal(errors.project.user_not_belong.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.project.user_not_belong.code);

                return done();
            });
    });

});

describe('DELETE /status/:id', function() {

    it('it is OK', function(done) {
        request(app)
            .delete('/status/53584239a1294f5a24940695')
            .set('Authorization', testTools.buildBasicAuthorization('delete_status@mail.com', 'delete_status@mail.com'))
            .expect(200, done);
    });

    it("ID's format is not good (Bad Request)", function(done) {
        request(app)
            .delete('/status/1234')
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

    it("Status not found", function(done) {
        request(app)
            .delete('/status/aaa84239a1294f5a24940690')
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
                    .to.equal(errors.status.not_found.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.status.not_found.code);

                return done();
            });
    });

    it('Not authorized to access this data (Unauthorized)', function(done) {
        request(app)
            .delete('/status/53584239a1294f5a24940691')
            .expect(401, done);
    });

    it('Not authorized to access this data (User not owner of status)', function(done) {
        request(app)
            .delete('/status/53584239a1294f5a24940691')
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
                    .to.equal(errors.status.not_owner.message);

                expect(res.body)
                    .to.have.property('code')
                    .to.equal(errors.status.not_owner.code);

                return done();
            });
    });

});
