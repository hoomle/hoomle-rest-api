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
 * @param userValidated
 * @param {Bim} bim
 * @param schema
 * @returns {Promise}
 */
var _emailAlreadyExist = function(userValidated, bim, schema) {
    if (bim.hasErrorWithPath('email') || _.isEmpty(userValidated.email) || !_.has(schema, 'email')) {
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

    return userDao.findOneReadOnlyByEmail(userValidated.email)
        .then(function(user) {
            if (user !== null) {
                var bimError = new BimError(
                    errors.user.email_already_exist.code,
                    'email',
                    errors.user.email_already_exist.message
                );
                bim.add(bimError);
                return when.reject({
                    value: userValidated,
                    bim: bim
                });
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
                'email',
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
 * @param {string} schemaName - if it is not specified, "default" will be used
 * @returns {Promise}
 */
var validateUser = function(value, schemaName) {
    var schema = joiSchema.getSchema('user', schemaName);
    var promise = validate(value, schema);

    var promiseEmailAlreadyExist = function(resolved) {
        return _emailAlreadyExist(resolved.value, resolved.bim, schema);
    };

    return promise.then(promiseEmailAlreadyExist, promiseEmailAlreadyExist);
};

module.exports = {
    _emailAlreadyExist:      _emailAlreadyExist,
    validate:               validateUser
};