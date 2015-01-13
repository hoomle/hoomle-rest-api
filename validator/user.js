'use strict';

var validate        = require('./joi/validate'),
    userServices    = require('../services/user'),
    BimError        = require('../bim/bimError'),
    errors          = require('../validator/errors'),
    joiSchema       = require('./joi/schema'),
    when            = require('when'),
    _               = require('lodash');

var _userAlreadyExist = function(userValidated, bim, schema) {
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

    return userServices.findOneReadOnlyByEmail(userValidated.email)
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
            return when.resolve({
                value: userValidated,
                bim: bim
            });
        }, function() {
            var bimError = new BimError(
                errors.user.email_checking.code,
                'email',
                errors.user.email_checking.message
            );
            bim.add(bimError);
            return when.reject({
                value: userValidated,
                bim: bim
            });
        });
};

var validateUser = function(value, schemaName) {
    var schema = joiSchema.getSchema('user', schemaName);
    var promise = validate(value, schema);

    var promiseUserAlreadyExist = function(resolved) {
        return _userAlreadyExist(resolved.value, resolved.bim, schema);
    };

    return promise.then(promiseUserAlreadyExist, promiseUserAlreadyExist);
};

module.exports = {
    _userAlreadyExist:  _userAlreadyExist,
    validate:           validateUser
};
