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
    show: show,
    index: index
};