'use strict';

var when                        = require('when'),
    hoomsManager                = require('../manager').Hooms,
    homepageValidator           = require('../validator').Homepage,
    photoHoomsValidator         = require('../validator').PhotoHooms,
    photoManager                = require('../helper/photoManager'),
    hoomsValidator              = require('../validator').Hooms,
    hoomsDao                    = require('../manager/dao').Hooms,
    homepageManager             = require('../manager').Homepage,
    errors                      = require('../validator').Errors,
    NotFoundBim                 = require('../bim/notFoundBim'),
    ForbiddenBim                = require('../bim/forbiddenBim'),
    decorate                    = require('../decorator').decorate,
    hoomsMask                   = require('../decorator/mask').Hooms,
    hoomsHateoas                = require('../decorator/hateoas').Hooms,
    _                           = require('lodash');

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

/**
 * PUT  /hooms/:slug/photos/profile
 *
 * Parameters:
 *  - slug
 *
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
var updatePhotoProfile = function(req, res, next) {
    homepageValidator.validate(req.params, 'paramRouteShow')
        .then(function() {
            return homepageManager.findOneReadOnlyBySlugAndUser(req.params.slug, req.user._id);
        })
        .then(function(homepage) {
            if (!homepage) {
                var bim = new ForbiddenBim(
                    errors.hooms.not_owner.code,
                    errors.hooms.not_owner.message
                );

                return when.reject({
                    value: null,
                    bim: bim
                });
            }

            return photoHoomsValidator.validate(req.files.photo || null, 'profile');
        })
        .then(function(resolved) {
            return photoManager.savePhotoFromUpload(resolved.value.name);
        }).then(function(filename) {
            console.log('new filename: ' + filename);
            return homepageManager.updatePhotoProfile(filename, req.params.slug, req.user._id);
        }).then(function(homepage) {
            res.redirect(
                303,
                req.protocol + '://' + req.get('host') + '/hooms/' + homepage.slug
            );
        }).then(null, function(err) {
            next(err.bim);
        });
};

module.exports = {
    create: create,
    show: show,
    updatePhotoProfile: updatePhotoProfile
};
