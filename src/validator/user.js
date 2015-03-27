'use strict';

var when            = require('when'),
    _               = require('lodash'),
    validate        = require('./joi/validate'),
    userDao         = require('../manager/dao').User,
    BimError        = require('../bim/bimError'),
    errors          = require('./errors'),
    joiSchema       = require('./joi/schema');

/**
 * Check if the email is unique
 *
 * /!\ This trick will be used until Joi accept "specific validator" /!\
 *
 * @param userValidated
 * @param {Bim} bim
 * @param schema
 * @param propertyName The property which will be mapped to the validator
 * @returns {Promise}
 */
var _emailAlreadyExist = function(userValidated, bim, schema, propertyName) {
    if (bim.hasErrorWithPath(propertyName) || !_.isObject(userValidated) || _.isEmpty(userValidated[propertyName]) ||
        !_.has(schema, propertyName)) {
        var resolved = {
            value: userValidated,
            bim: bim
        };
        if (bim.isValid()) {
            return when.resolve(resolved);
        } else {
            return when.reject(resolved);
        }
    }

    return userDao.findOneReadOnlyByEmail(userValidated[propertyName])
        .then(function(user) {
            if (user !== null) {
                var bimError = new BimError(
                    errors.user.email_already_exist.code,
                    propertyName,
                    errors.user.email_already_exist.message
                );
                bim.add(bimError);
            }

            if (bim.isValid()) {
                return when.resolve({
                    value: userValidated,
                    bim: bim
                });
            } else {
                return when.reject({
                    value: userValidated,
                    bim: bim
                });
            }
        }, function() {
            var bimError = new BimError(
                errors.user.internal.code,
                propertyName,
                errors.user.internal.message
            );
            bim.add(bimError);
            return when.reject({
                value: userValidated,
                bim: bim
            });
        });
};

/**
 * Valid the values to record a new user
 *
 * @param {Object} value - User data to validate
 * @param {string} schemaName
 * @returns {Promise}
 */
var validateUser = function(value, schemaName) {
    var schema = joiSchema.getSchema('user', schemaName);
    var promise = validate(value, schema);

    var promiseEmailAlreadyExist = function(resolved) {
        return _emailAlreadyExist(resolved.value, resolved.bim, schema, 'email');
    };

    if (schemaName === 'object') {
        return promise.then(promiseEmailAlreadyExist, promiseEmailAlreadyExist);
    } else {
        return promise;
    }
};

module.exports = {
    _emailAlreadyExist:     _emailAlreadyExist,
    validate:               validateUser
};
