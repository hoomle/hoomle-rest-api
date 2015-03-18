'use strict';

var when                = require('when'),
    hoomleManager       = require('../manager').Hoomle,
    homepageValidator   = require('../validator/homepage'),
    hoomleDao           = require('../manager/dao').Hoomle,
    errors              = require('../validator').Errors,
    NotFoundBim         = require('../bim/notFoundBim'),
    decorate            = require('../decorator').decorate,
    hoomleMask          = require('../decorator/mask').Hoomle,
    hoomleHateoas       = require('../decorator/hateoas').Hoomle;

/**
 * POST  /hoomle
 *
 * Request payload:
 *  {
 *      email: "chuck.norris@god.com",
 *      password: "0000",
 *      displayName: "Chuck Norris",
 *      slug: "chuck"
 *  }
 *
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
var create = function(req, res, next) {
    hoomleManager
        .create(req.body)
        .then(function(resolved) {
            var data = decorate(resolved.value, [
                hoomleMask,
                hoomleHateoas
            ]);
            res
                .contentType('application/json')
                .status(201)
                .send(JSON.stringify(data));
        }, function(err) {
            next(err.bim);
        });
};

/**
 * GET  /hoomle/:slug
 *
 * Parameters:
 *  - slug | Respect the format of slug
 *
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
var show = function(req, res, next) {
    homepageValidator.validate(req.params, 'paramRouteShow')
        .then(function(resolved) {
            return hoomleDao.findOneReadOnlyBySlug(resolved.value.slug);
        })
        .then(function(data) {
            if (!data) {
                return when.reject({
                    value: req.params,
                    bim: new NotFoundBim(
                        errors.hoomle.not_found.code,
                        errors.hoomle.not_found.message
                    )
                });
            }
            data = decorate(data, [
                hoomleMask,
                hoomleHateoas
            ]);
            res
                .contentType('application/json')
                .send(JSON.stringify(data));
        }).then(null, function(err) {
            next(err.bim);
        });
};

module.exports = {
    create: create,
    show: show
};
