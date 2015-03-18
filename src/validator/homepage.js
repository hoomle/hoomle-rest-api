'use strict';

var when            = require('when'),
    _               = require('lodash'),
    validate        = require('./joi/validate'),
    homepageDao     = require('../manager/dao').Homepage,
    BimError        = require('../bim/bimError'),
    errors          = require('./errors'),
    joiSchema       = require('./joi/schema');

/**
 * Check if the slug is unique
 *
 * /!\ This trick will be used until Joi accept "specific validator" /!\
 *
 * @param homepageValidated
 * @param {Bim} bim
 * @param schema
 * @param propertyName The property which will be mapped to the validator
 * @returns {Promise}
 */
var _slugAlreadyExist = function(homepageValidated, bim, schema, propertyName) {
    if (bim.hasErrorWithPath(propertyName) || _.isEmpty(homepageValidated[propertyName])
            || !_.has(schema, propertyName)) {
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

    return homepageDao.findOneReadOnlyBySlug(homepageValidated[propertyName])
        .then(function(homepage) {
            if (homepage !== null) {
                var bimError = new BimError(
                    errors.homepage.slug_already_exist.code,
                    propertyName,
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
                propertyName,
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
 * @param {string} schemaName
 * @returns {Promise}
 */
var validateHomepage = function(value, schemaName) {
    var schema = joiSchema.getSchema('homepage', schemaName);
    var promise = validate(value, schema);

    var promiseSlugAlreadyExist = function(resolved) {
        return _slugAlreadyExist(resolved.value, resolved.bim, schema, 'slug');
    };

    if (schemaName === 'object') {
        return promise.then(promiseSlugAlreadyExist, promiseSlugAlreadyExist);
    } else {
        return promise;
    }
};

module.exports = {
    _slugAlreadyExist:      _slugAlreadyExist,
    validate:               validateHomepage
};
