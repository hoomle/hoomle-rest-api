'use strict';

var validate            = require('./joi/validate'),
    joiSchema           = require('./joi/schema'),
    photoFileHelpers    = require('./helpers/photoFile'),
    _                   = require('lodash'),
    when                = require('when'),
    BimError            = require('../bim/bimError'),
    errors              = require('./errors'),
    photoManager        = require('../helper/photoManager');

/**
 * We are waiting the next release of Joi (version 7.0.0)
 * This next version bring we a new way to create a specific error
 * and avoid this "trick" you can see below
 */

/**
 * Check if the format is supported
 *
 * /!\ This trick will be used until Joi accept "specific validator" /!\
 *
 * @param photoValidated
 * @param {Bim} bim
 * @param schema
 * @param propertyName The property which will be mapped to the validator
 * @param {Array} formats format supported
 * @returns {Promise}
 */
var _formatSupported = function(photoValidated, bim, schema, propertyName, formats) {
    if (bim.hasErrorWithPath(propertyName) || !_.isObject(photoValidated) || _.isEmpty(photoValidated[propertyName]) ||
        !_.has(schema, propertyName)) {
        var resolved = {
            value: photoValidated,
            bim: bim
        };
        if (bim.isValid()) {
            return when.resolve(resolved);
        } else {
            return when.reject(resolved);
        }
    }

    return photoFileHelpers
        .format(photoManager.resolvePathFromUploadFolder(photoValidated[propertyName]), formats)
        .then(function() {
            if (bim.isValid()) {
                return when.resolve({
                    value: photoValidated,
                    bim: bim
                });
            } else {
                return when.reject({
                    value: photoValidated,
                    bim: bim
                });
            }
        }, function(err) {
            var code = _.has(err, 'code') ? err.code : errors.file.photo.invalid_format.code;
            var message = _.has(err, 'message') ? err.message : errors.file.photo.invalid_format.message;

            var bimError = new BimError(
                code,
                propertyName,
                message
            );
            bim.add(bimError);
            return when.reject({
                value: photoValidated,
                bim: bim
            });
        });
};

/**
 * Check the min size of the image
 *
 * /!\ This trick will be used until Joi accept "specific validator" /!\
 *
 * @param photoValidated
 * @param {Bim} bim
 * @param schema
 * @param propertyName The property which will be mapped to the validator
 * @param {integer} width
 * @param {integer} height
 * @returns {Promise}
 */
var _minImageSize = function(photoValidated, bim, schema, propertyName, width, height) {
    if (bim.hasErrorWithPath(propertyName) || !_.isObject(photoValidated) || _.isEmpty(photoValidated[propertyName]) ||
        !_.has(schema, propertyName)) {
        var resolved = {
            value: photoValidated,
            bim: bim
        };
        if (bim.isValid()) {
            return when.resolve(resolved);
        } else {
            return when.reject(resolved);
        }
    }

    return photoFileHelpers
        .minImageSize(photoManager.resolvePathFromUploadFolder(photoValidated[propertyName]), width, height)
        .then(function() {
            if (bim.isValid()) {
                return when.resolve({
                    value: photoValidated,
                    bim: bim
                });
            } else {
                return when.reject({
                    value: photoValidated,
                    bim: bim
                });
            }
        }, function(err) {
            var code = _.has(err, 'code') ? err.code : errors.file.photo.image_size_too_small.code;
            var message = _.has(err, 'message') ? err.message : errors.file.photo.image_size_too_small.message;

            var bimError = new BimError(
                code,
                propertyName,
                message
            );
            bim.add(bimError);
            return when.reject({
                value: photoValidated,
                bim: bim
            });
        });
};

/**
 * Check the max size (weight) of the image (file)
 *
 * /!\ This trick will be used until Joi accept "specific validator" /!\
 *
 * @param photoValidated
 * @param {Bim} bim
 * @param schema
 * @param propertyName The property which will be mapped to the validator
 * @param {integer} size
 * @returns {Promise}
 */
var _maxSize = function(photoValidated, bim, schema, propertyName, size) {
    if (bim.hasErrorWithPath(propertyName) || !_.isObject(photoValidated) || _.isEmpty(photoValidated[propertyName]) ||
        !_.has(schema, propertyName)) {
        var resolved = {
            value: photoValidated,
            bim: bim
        };
        if (bim.isValid()) {
            return when.resolve(resolved);
        } else {
            return when.reject(resolved);
        }
    }

    return photoFileHelpers
        .maxSize(photoManager.resolvePathFromUploadFolder(photoValidated[propertyName]), size)
        .then(function() {
            if (bim.isValid()) {
                return when.resolve({
                    value: photoValidated,
                    bim: bim
                });
            } else {
                return when.reject({
                    value: photoValidated,
                    bim: bim
                });
            }
        }, function(err) {
            var code = _.has(err, 'code') ? err.code : errors.file.photo.size_too_big.code;
            var message = _.has(err, 'message') ? err.message : errors.file.photo.size_too_big.message;

            var bimError = new BimError(
                code,
                propertyName,
                message
            );
            bim.add(bimError);
            return when.reject({
                value: photoValidated,
                bim: bim
            });
        });
};

/**
 * Valid the values to record a new photo
 *
 * @param {Object} value - Hoomle data to validate
 * @param {string} schemaName
 * @returns {Promise}
 */
var validatePhotoHooms = function(value, schemaName) {
    var schema = joiSchema.getSchema('photoHooms', schemaName);
    var promise = validate(value, schema, {
        allowUnknown: true,
        stripUnknown: true
    });

    var promiseFormatAccepted = function(resolved) {
        return _formatSupported(resolved.value, resolved.bim, schema, 'name', ['jpeg', 'png', 'gif']);
    };

    var promiseMinImageSize = function(resolved) {
        return _minImageSize(resolved.value, resolved.bim, schema, 'name', 350, 350);
    };

    var promiseMaxSize = function(resolved) {
        return _maxSize(resolved.value, resolved.bim, schema, 'name', 8000000);
    };

    var remapError = function(newPath) {
        return function(resolved) {
            if (!resolved.bim.isValid()) {
                _(resolved.bim.errors).forEach(function(bimError) {
                    bimError.path = newPath;
                });
                return when.reject(resolved);
            }
            return when.resolve(resolved);
        };
    };

    return promise
        .then(promiseFormatAccepted, promiseFormatAccepted)
        .then(promiseMinImageSize, promiseMinImageSize)
        .then(promiseMaxSize, promiseMaxSize)
        .then(remapError('photo'), remapError('photo'));
};

module.exports = {
    validate: validatePhotoHooms
};
