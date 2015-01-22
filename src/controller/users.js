'use strict';

var when            = require('when'),
    userDao         = require('../manager/dao/index').User,
    userManager     = require('../manager/index').User,
    userValidator   = require('../validator/user'),
    errors          = require('../validator').Errors,
    NotFoundBim     = require('../bim/notFoundBim'),
    decorate        = require('../decorator').decorate,
    userMask        = require('../decorator/mask').User,
    userHateoas     = require('../decorator/hateoas').User;

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
            data = decorate(data, [
                userMask,
                userHateoas
            ]);
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
    userManager
        .create(req.body)
        .then(function(resolved) {
            var data = decorate(resolved.value.toObject(), [
                userMask,
                userHateoas
            ]);
            res
                .contentType('application/json')
                .status(201)
                .send(JSON.stringify(data));
        }, function(err) {
            next(err.bim);
        });
};

module.exports = {
    show: show,
    create: create
};
