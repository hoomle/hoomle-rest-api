'use strict';

var objectHelper        = require('../helpers/object'),
    homepageDao         = require('../manager/dao').Homepage,
    homepageManager     = require('../manager').Homepage,
    homepageValidator   = require('../validator').Homepage,
    errors              = require('../validator').Errors,
    NotFoundBim         = require('../bim/notFoundBim'),
    when                = require('when');

/**
 * GET  /homepage/:slug
 *
 * Parameters:
 *  - slug | Respect the format of slug
 *
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
var show = function(req, res, next) {
    console.log('controller:homepages:show');

    homepageValidator.validate(req.params, 'paramRouteShow')
        .then(function(resolved) {
            return homepageDao.findOneReadOnlyBySlug(resolved.value.slug);
        })
        .then(function(data) {
            if (!data) {
                return when.reject({
                    value: req.params,
                    bim: new NotFoundBim(
                        errors.homepage.not_found.code,
                        errors.homepage.not_found.message
                    )
                });
            }
            data = objectHelper.removeProperties(['__v'], data);
            res
                .contentType('application/json')
                .send(JSON.stringify(data));
        }).then(null, function(err) {
            next(err.bim);
        });
};

/**
 * POST  /homepages
 *
 * Request payload:
 *  {
 *      slug: "stan",
 *      bio: "Passionnate about travel, sport and development",
 *      location: "Paris, France"
 *  }
 *
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
var create = function(req, res, next) {
    console.log('controller:homepages:create');

    homepageValidator
        .validate(req.body)
        .then(function(resolved) {
            resolved.value.owner = req.user._id;
            return homepageManager.create(resolved.value);
        }, function(err) {
            return when.reject(err);
        })
        .then(function(homepageCreated) {
            res
                .contentType('application/json')
                .status(201)
                .send(JSON.stringify(homepageCreated));
        }, function(err) {
            next(err.bim);
        });
};

module.exports = {
    show:   show,
    create: create
};