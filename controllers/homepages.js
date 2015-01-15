'use strict';

var objectHelper    = require('../helpers/object'),
    homepageDao     = require('../manager/dao').Homepage,
    homepageManager = require('../manager').Homepage,
    errors          = require('../validator').Errors,
    NotFoundBim     = require('../bim/notFoundBim'),
    errorHandler    = require('./default').errorHandler,
    when            = require('when');

/**
 * GET  /homepage/:slug
 *
 * Parameters:
 *  - slug | Respect the format of slug
 *
 * @param {Request} req
 * @param {Response} res
 */
var show = function(req, res) {
    console.log('controller:homepages:show');

    // TODO Valid the slug format
    homepageDao.findOneReadOnlyBySlug(req.params.slug)
        .then(function(data) {
            if (!data) {
                return when.reject(new NotFoundBim(
                    errors.homepage.not_found.code,
                    errors.homepage.not_found.message
                ));
            }
            data = objectHelper.removeProperties(['__v'], data);
            res
                .contentType('application/json')
                .send(JSON.stringify(data));
        }).then(null, function(err) {
            errorHandler(err, req, res);
        });
};

/**
 * POST  /homepages
 *
 * Request payload:
 *  {
 *      slug: "stan",
 *      bio: "Passionnate about travel, sport and development",
 *      location: "Paris, France",
 *      owner: "5486ebf6d8d0673f156a53e3",
 *  }
 *
 * @param {Request} req
 * @param {Response} res
 */
var create = function(req, res) {
    console.log('controller:homepages:create');

    homepageManager
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
    show:   show,
    create: create
};
