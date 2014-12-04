var User            = require('../models').User,
    userAdapter     = require('../adapter').User,
    objectHelper    = require('../helpers/object'),
    httpErrors      = require('../helpers/http.errors'),
    userService     = require('../services').User,
    projectService  = require('../services').Project,
    stringValidator = require('../validator').String,
    userValidator   = require('../validator').User,
    errors          = require('../validator').Errors,
    when            = require('when'),
    _               = require('lodash');

/**
 * POST  /users
 * 
 * Parameters:
 *  - email | Respect email format
 *  - password | Min length: 3 and Max length: 15
 *  - password_confirm | Must be the same with 'password'
 */
var create = function(req, res, next) {
    userValidator.samePassword(req.body.password, req.body.password_confirm)
        .then(function() {
            return userValidator.password(req.body.password);
        })
        .then(function() {
            return userValidator.email(req.body.email);
        })
        .then(function() {
            return userValidator.emailNotExist(req.body.email);
        })
        .then(function() {
            return User.create({
                email: req.body.email,
                password: req.body.password
            });
        })
        .then(function(user) {
            user = user.toObject();
            user = objectHelper.removeProperties(['__v', 'password'], user);
            user = userAdapter.hateoasize(['self', 'status'], user);
            res
                .contentType('application/json')
                .send(201, JSON.stringify(user));
        })
        .then(null, function(err) {
            if (_.has(err, 'code')) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            }
            return next(err);
        });
};

/**
 * PUT  /me
 *
 * Parameters:
 *  - email | Optional | Respect email format
 *  - password | Optional | Min length: 3 and Max length: 15
 *  - password_confirm | Optional | Must be the same with 'password'
 */
var update = function(req, res, next) {

    var changes         = req.body,
        promisePassword = null,
        promiseEmail    = null;

    if (_.has(changes, 'password') && _.has(changes, 'password_confirm')) {
        promisePassword = userValidator.samePassword(changes.password, changes.password_confirm)
            .then(function() {
                return userValidator.password(changes.password);
            });
    }

    if (_.has(changes, 'email')) {
        promiseEmail = userValidator.email(changes.email)
            .then(function() {
                return userService.findOneReadOnlyByEmail(changes.email);
            })
            .then(function(user) {
                if (user && user._id !== req.user._id) {
                    return when.reject(errors.user.email_already_exist);
                } else {
                    return when.resolve();
                }
            });
    }

    userService.findOneById(req.user._id)
        .then(function() {
            return (promisePassword !== null) ? promisePassword : when.resolve();
        })
        .then(function() {
            return (promiseEmail !== null) ? promiseEmail : when.resolve();
        })
        .then(function() {
            // Update object with changes
            Object.keys(changes).forEach(function(key) {
                req.user.set(key, changes[key]);
            });
            return req.user.save();
        })
        .then(function() {
            user = req.user.toObject();
            user = objectHelper.removeProperties(['__v', 'password'], user);
            user = userAdapter.hateoasize(['self', 'status'], user);
            res
                .contentType('application/json')
                .send(JSON.stringify(user));
        })
        .then(null, function(err) {
            if (_.has(err, 'code')) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new httpErrors.BadRequest(errors.string.documentid_bad_format));
            }
            return next(err);
        });
};

/**
 * GET  /me
 */
var self = function(req, res, next) {
    var user = req.user;
    if (!user) {
        next(errors.user.not_found);
    }
    user = user.toObject();
    user = objectHelper.removeProperties(['__v', 'password'], user);
    user = userAdapter.hateoasize(['self', 'status'], user);
    res
        .contentType('application/json')
        .send(JSON.stringify(user));
};

/**
 * GET  /users/:id
 * 
 * Parameters:
 *  - id | Respect the format of Mongo's Id
 */
var show = function(req, res, next) {
    stringValidator.isDocumentId(req.params.id)
        .then(function(value) {
            return userService.findOneReadOnlyById(value);
        })
        .then(function (data) {
            if (!data) {
                return when.reject(new httpErrors.NotFound(errors.user.not_found));
            }
            data = objectHelper.removeProperties(['__v', 'password'], data);
            // data = userAdapter.hateoasize(['self', 'status'], data);
            res
                .contentType('application/json')
                .send(JSON.stringify(data));

        }).then(null, function(err) {
            if (_.has(err, 'code') && !(err instanceof httpErrors.NotFound)) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new httpErrors.BadRequest(errors.string.documentid_bad_format));
            }
            return next(err);
        });
};

/**
 * GET  /project/:id/users
 *
 * Parameters:
 *  - id | Respect the format of Mongo's Id
 */
var listByProject = function(req, res, next) {
    stringValidator.isDocumentId(req.params.id)
        .then(function(value) {
            return projectService.findOneReadOnlyById(value);
        })
        .then(function(project) {
            // Check if the project doesn't exist
            if (!project) {
                return when.reject(new httpErrors.NotFound(errors.project.not_found));
            }
            // User is able to access this project
            // @Todo Use query to mongo to determine ability
            var isAble = _.find(project.users, function(userId) {
                return userId.toString() === req.user._id.toString();
            });
            if (!isAble) {
                return when.reject(new httpErrors.Unauthorized(errors.project.user_not_belong));
            }
            return userService.findReadOnlyByIds(project.users, '_id email');
        })
        .then(function(users) {
            users = users
                .map(function(object) {
                    return objectHelper.removeProperties(['__v', 'password'], object);
                })
                .map(function(object) {
                    return userAdapter.hateoasize(['self'], object);
                });

            var data = {
                data: users
            };

            res
                .contentType('application/json')
                .send(200, JSON.stringify(data));
        })
        .then(null, function(err) {
            if (_.has(err, 'code') && !(err instanceof httpErrors.NotFound) && !(err instanceof httpErrors.Unauthorized)) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new httpErrors.BadRequest(errors.string.documentid_bad_format));
            }
            return next(err);
        });
};

/**
 * POST  /project/:id/users
 *
 * Parameters:
 *  - id | Respect the format of Mongo's Id
 */
var addToProject = function(req, res, next) {
    var project = null;
    stringValidator.isDocumentId(req.params.id)
        .then(function(value) {
            return projectService.findOneById(value);
        })
        .then(function(p) {
            // Check if the project doesn't exist
            if (!p) {
                return when.reject(new httpErrors.NotFound(errors.project.not_found));
            }
            // Copy to use in other 'then()'
            project = p;
            // User is the owner
            if (p.owner.toString() !== req.user._id.toString()) {
                return when.reject(new httpErrors.Forbidden(errors.project.not_owner));
            }
            return userService.findOneReadOnlyById(req.body.user, '_id');
        })
        .then(function(user) {
            if (!user) {
                return when.reject(new httpErrors.BadRequest(errors.user.not_found));
            }
            // User is already assigned
            var isAssigned = _.find(project.users, function(userId) {
                return userId.toString() === user._id.toString();
            });
            if (isAssigned) {
                return when.reject(new httpErrors.BadRequest(errors.project.user_already_assigned));
            }
            project.users.push(user._id);
            return project.save();
        })
        .then(function() {
            res
                .status(200)
                .send();
        })
        .then(null, function(err) {
            if (_.has(err, 'code') && !(err instanceof httpErrors.NotFound) && !(err instanceof httpErrors.Forbidden)) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new httpErrors.BadRequest(errors.string.documentid_bad_format));
            }
            return next(err);
        });
};

/**
 * DELETE  /project/:id/users/:idUser
 *
 * Parameters:
 *  - id | Respect the format of Mongo's Id
 *  - idUser | Respect the format of Mongo's Id
 */
var removeUserFromProject = function(req, res, next) {
    var project = null;
    stringValidator.isDocumentId(req.params.id)
        .then(function(value) {
            return projectService.findOneById(value);
        })
        .then(function(p) {
            // Check if the project doesn't exist
            if (!p) {
                return when.reject(new httpErrors.NotFound(errors.project.not_found));
            }
            // Copy to use in other 'then()'
            project = p;
            // User is the owner
            if (p.owner.toString() !== req.user._id.toString()) {
                return when.reject(new httpErrors.Forbidden(errors.project.not_owner));
            }
            return stringValidator.isDocumentId(req.params.idUser);
        })
        .then(function(idUser) {
            return userService.findOneReadOnlyById(idUser, '_id');
        })
        .then(function(user) {
            if (!user) {
                return when.reject(new httpErrors.BadRequest(errors.user.not_found));
            }
            // User is assigned
            var isAssigned = _.find(project.users, function(userId) {
                return userId.toString() === user._id.toString();
            });
            if (!isAssigned) {
                return when.reject(new httpErrors.BadRequest(errors.project.user_not_assigned));
            }
            var newList = _.reject(project.users, function(userId) {
                return userId.toString() === user._id.toString();
            });
            project.set('users', newList);
            return project.save();
        })
        .then(function() {
            res
                .status(200)
                .send();
        })
        .then(null, function(err) {
            if (_.has(err, 'code') && !(err instanceof httpErrors.NotFound) && !(err instanceof httpErrors.Forbidden)) {
                return next(new httpErrors.BadRequest(err.message, err.code));
            } else if (_.has(err, 'name') && err.name === 'CastError') {
                return next(new httpErrors.BadRequest(errors.string.documentid_bad_format));
            }
            return next(err);
        });
};

/**
 * GET  /users/?username=stan
 *
 * Parameters:
 *  - username | Username to search
 */
var index = function(req, res, next) {

    console.log('controller:index');

    var username = req.query.username;

    // Filter data with query param "username"
    if (!_.isEmpty(username)) {
        userService
            .findOneReadOnlyByUsername(username)
            .then(function(user) {

                if (null == user) {
                    return when.reject();
                }

                var users = [user];
                users = users
                    .map(function(object) {
                        return objectHelper.removeProperties(['__v', 'password'], object);
                    });

                var data = {
                    users: users
                };

                res
                    .contentType('application/json')
                    .status(200)
                    .send(JSON.stringify(data));
            })
            .then(null, function() {
                res
                    .contentType('application/json')
                    .status(200)
                    .send(JSON.stringify([]));
            });
    } else {
        return next(new httpErrors.BadRequest(errors.users.missing_filters));
    }
};

module.exports = {
    // create: create,
    // update: update,
    // self: self,
    show: show,
    index: index
    // listByProject: listByProject,
    // addToProject: addToProject,
    // removeUserFromProject: removeUserFromProject
};