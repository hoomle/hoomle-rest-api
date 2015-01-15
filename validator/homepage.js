'use strict';

var validate        = require('./joi/validate'),
    userDao         = require('../manager/dao').User,
    homepageDao     = require('../manager/dao').Homepage,
    BimError        = require('../bim/bimError'),
    errors          = require('../validator/errors'),
    joiSchema       = require('./joi/schema'),
    when            = require('when'),
    _               = require('lodash');

/**
 * Check if the slug is unique
 *
 * @param homepageValidated
 * @param {Bim} bim
 * @param schema
 * @returns {Promise}
 */
var _slugAlreadyExist = function(homepageValidated, bim, schema) {
    if (bim.hasErrorWithPath('slug') || _.isEmpty(homepageValidated.slug) || !_.has(schema, 'slug')) {
        var resolved = {
            value: homepageValidated,
            bim: bim
        };
        if (bim.isValid()) {
            return when.resolve(resolved);
        } else {
            return when.reject(resolved);
        }
    }

    return homepageDao.findOneReadOnlyBySlug(homepageValidated.slug)
        .then(function(homepage) {
            if (homepage !== null) {
                var bimError = new BimError(
                    errors.homepage.slug_already_exist.code,
                    'slug',
                    errors.homepage.slug_already_exist.message
                );
                bim.add(bimError);
                return when.reject({
                    value: homepageValidated,
                    bim: bim
                });
            }

            if (bim.isValid()) {
                return when.resolve({
                    value: homepageValidated,
                    bim: bim
                });
            } else {
                return when.reject({
                    value: homepageValidated,
                    bim: bim
                });
            }
        }, function() {
            var bimError = new BimError(
                errors.homepage.internal.code,
                'slug',
                errors.homepage.internal.message
            );
            bim.add(bimError);
            return when.reject({
                value: homepageValidated,
                bim: bim
            });
        });
};

/**
 * Check if the owner exist
 *
 * @param homepageValidated
 * @param {Bim} bim
 * @param schema
 * @returns {Promise}
 */
var _ownerExist = function(homepageValidated, bim, schema) {
    if (bim.hasErrorWithPath('owner') || _.isEmpty(homepageValidated.owner) || !_.has(schema, 'owner')) {
        var resolved = {
            value: homepageValidated,
            bim: bim
        };
        if (bim.isValid()) {
            return when.resolve(resolved);
        } else {
            return when.reject(resolved);
        }
    }

    return userDao.findOneReadOnlyById(homepageValidated.owner)
        .then(function(user) {
            if (user === null) {
                var bimError = new BimError(
                    errors.homepage.owner_not_exist.code,
                    'owner',
                    errors.homepage.owner_not_exist.message
                );
                bim.add(bimError);
                return when.reject({
                    value: homepageValidated,
                    bim: bim
                });
            }
            if (bim.isValid()) {
                return when.resolve({
                    value: homepageValidated,
                    bim: bim
                });
            } else {
                return when.reject({
                    value: homepageValidated,
                    bim: bim
                });
            }
        }, function() {
            var bimError = new BimError(
                errors.homepage.internal.code,
                'owner',
                errors.homepage.internal.message
            );
            bim.add(bimError);
            return when.reject({
                value: homepageValidated,
                bim: bim
            });
        });
};

/**
 * Valid the values to record a new homepage
 *
 * @param {Object} value - Homepage data to validate
 * @param {string} schemaName - if it is not specified, "default" will be used
 * @returns {Promise}
 */
var validateHomepage = function(value, schemaName) {
    var schema = joiSchema.getSchema('homepage', schemaName);
    var promise = validate(value, schema);

    var promiseSlugAlreadyExist = function(resolved) {
        return _slugAlreadyExist(resolved.value, resolved.bim, schema);
    };

    var promiseOwnerNotExist = function(resolved) {
        return _ownerExist(resolved.value, resolved.bim, schema);
    };

    return promise
        .then(promiseSlugAlreadyExist, promiseSlugAlreadyExist)
        .then(promiseOwnerNotExist, promiseOwnerNotExist);
};

module.exports = {
    _slugAlreadyExist:      _slugAlreadyExist,
    _ownerExist:            _ownerExist,
    validate:               validateHomepage
};
