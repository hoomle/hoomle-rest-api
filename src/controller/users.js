'use strict';

var when            = require('when'),
    userDao         = require('../manager/dao').User,
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

module.exports = {
    show: show
};
