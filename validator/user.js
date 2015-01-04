'use strict';

var validate        = require('./joi/validate'),
    userServices    = require('../services/user'),
    BimError        = require('../bim/bimError'),
    joiSchema       = require('./joi/schema'),
    when            = require('when'),
    _               = require('lodash');

var _userAlreadyExist = function(userValidated, bim, schema) {

    if (bim.has('email') || _.isEmpty(userValidated.email) || !_.has(schema, 'email')) {
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
                    'user.already_exist',
                    'email',
                    'An user already exist with this email'
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
                'user.already_exist_fail',
                'email',
                'internal error on email checking'
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
