'use strict';

var objectHelper    = require('../helpers/object'),
    httpErrors      = require('../helpers/http.errors'),
    userService     = require('../services').User,
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
        .then(function(data) {
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
                if (user === null) {
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

/**
 * POST  /users
 *
 * Payload:
 *  {
"_id": "548897bff32113d9017a70f9",
"email": "stanislas.chollet@gmail.com",
 "username": "stan",
 "firstName": "Stan",
 "lastName": "Chollet",
 "displayName": "Stan Chollet",
 "bio": "Passionnate about travel, sport and development",
 "location": "Paris, France",
 "createdAt": "2014-12-10T18:58:07.640Z"
 }
 */
var create = function(req, res) {
    console.log('controller:create');

    userValidator
        .validate(req.body)
        .then(function(resolved) {
            res
                .contentType('application/json')
                .status(200)
                .send(JSON.stringify(resolved.value));
        }, function(err) {
            res
                .contentType('application/json')
                .status(err.bim.status)
                .send(err.bim.render('json'));
        });
};

module.exports = {
    show: show,
    index: index,
    create: create
};