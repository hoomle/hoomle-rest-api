'use strict';

var objectHelper    = require('../helpers/object'),
    userDao         = require('../manager/dao').User,
    userManager     = require('../manager').User,
    userValidator   = require('../validator/user'),
    errors          = require('../validator').Errors,
    NotFoundBim     = require('../bim/notFoundBim'),
    when            = require('when');

/**
 * GET  /users/:id
 *
 * Parameters:
 *  - id | Respect the format of Mongo's Id
 *
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
var show = function(req, res, next) {
    console.log('controller:users:show');

    userValidator.validate(req.params, 'paramRouteShow')
        .then(function(resolved) {
            return userDao.findOneReadOnlyById(resolved.value.id);
        })
        .then(function(data) {
            if (!data) {
                return when.reject({
                    value: req.params,
                    bim: new NotFoundBim(
                        errors.user.not_found.code,
                        errors.user.not_found.message
                    )
                });
            }
            data = objectHelper.removeProperties(['__v', 'password'], data);
            res
                .contentType('application/json')
                .send(JSON.stringify(data));
        }).then(null, function(err) {
            next(err.bim);
        });
};

/**
 * POST  /users
 *
 * Request payload:
 *  {
 *      email: "stanislas.chollet@gmail.com",
 *      password: "0000",
 *      displayName: "Stan Chollet"
 *  }
 *
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
var create = function(req, res, next) {
    console.log('controller:users:create');

    userManager
        .create(req.body)
        .then(function(resolved) {
            res
                .contentType('application/json')
                .status(201)
                .send(JSON.stringify(resolved.value));
        }, function(err) {
            next(err.bim);
        });
};

module.exports = {
    show: show,
    create: create
};
