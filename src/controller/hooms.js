'use strict';

var when                = require('when'),
    hoomsManager        = require('../manager').Hooms,
    hoomsValidator      = require('../validator').Hooms,
    homepageValidator   = require('../validator').Homepage,
    hoomsDao            = require('../manager/dao').Hooms,
    errors              = require('../validator').Errors,
    NotFoundBim         = require('../bim/notFoundBim'),
    decorate            = require('../decorator').decorate,
    hoomsMask           = require('../decorator/mask').Hooms,
    hoomsHateoas        = require('../decorator/hateoas').Hooms,
    _                   = require('lodash');

/**
 * POST  /hooms [?dryrun]
 *
 * dryrun mode valid the payload and return 204 if it is ok,
 * else, it return the errors according the data sent.
 * With this mode it is possible to valid partial data, for example, just the email.
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
    if (_.has(req.query, 'dryrun')) {
        hoomsValidator
            .validate(req.body, 'creationDryrun')
            .then(function() {
                res
                    .contentType('application/json')
                    .status(204)
                    .send();
            }, function(err) {
                next(err.bim);
            });
    } else {
        hoomsManager
            .create(req.body)
            .then(function(resolved) {
                var data = decorate(resolved.value, [
                    hoomsMask,
                    hoomsHateoas
                ]);
                res
                    .contentType('application/json')
                    .status(201)
                    .send(JSON.stringify(data));
            }, function(err) {
                next(err.bim);
            });
    }
};

/**
 * GET  /hooms/:slug
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
            return hoomsDao.findOneReadOnlyBySlug(resolved.value.slug);
        })
        .then(function(data) {
            if (!data) {
                return when.reject({
                    value: req.params,
                    bim: new NotFoundBim(
                        errors.hooms.not_found.code,
                        errors.hooms.not_found.message
                    )
                });
            }
            data = decorate(data, [
                hoomsMask,
                hoomsHateoas
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
