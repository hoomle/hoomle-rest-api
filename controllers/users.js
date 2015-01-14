'use strict';

var objectHelper    = require('../helpers/object'),
    httpErrors      = require('../helpers/http.errors'),
    userDao         = require('../manager/dao').User,
    userManager     = require('../manager').User,
    stringValidator = require('../validator').String,
    errors          = require('../validator').Errors,
    NotFoundBim     = require('../bim/notFoundBim'),
    errorHandler    = require('./default').errorHandler,
    when            = require('when'),
    _               = require('lodash');

/**
 * GET  /users/:id
 *
 * Parameters:
 *  - id | Respect the format of Mongo's Id
 *
 * @param {Request} req
 * @param {Response} res
 */
var show = function(req, res) {
    stringValidator.isDocumentId(req.params.id)
        .then(function(value) {
            return userDao.findOneReadOnlyById(value);
        })
        .then(function(data) {
            if (!data) {
                return when.reject(new NotFoundBim(
                    errors.user.not_found.code,
                    errors.user.not_found.message
                ));
            }
            data = objectHelper.removeProperties(['__v', 'password'], data);
            res
                .contentType('application/json')
                .send(JSON.stringify(data));
        }).then(null, function(err) {
            errorHandler(err, req, res);
        });
};

/**
 * GET  /users/?username=stan
 *
 * Parameters:
 *  - username | Username to search
 *
 * @param {Request} req
 * @param {Response} res
 */
var index = function(req, res, next) {
    console.log('controller:index');

    var username = req.query.username;

    // Filter data with query param "username"
    if (!_.isEmpty(username)) {
        userDao
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
 * Request payload:
 *  {
 *      email: "stanislas.chollet@gmail.com",
 *      username: "stan",
 *      firstName: "Stan",
 *      lastName: "Chollet",
 *      displayName: "Stan Chollet",
 *      bio: "Passionnate about travel, sport and development",
 *      location: "Paris, France",
 *  }
 *
 * @param {Request} req
 * @param {Response} res
 */
var create = function(req, res) {
    console.log('controller:create');

    userManager
        .create(req.body)
        .then(function(resolved) {
            res
                .contentType('application/json')
                .status(201)
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
