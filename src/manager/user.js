'use strict';

var when            = require('when'),
    userValidator   = require('../validator').User,
    errors          = require('../validator').Errors,
    userHelper      = require('../helpers/user'),
    BimError        = require('../bim/bimError'),
    User            = require('../models/index').User;

/**
 * Create an user
 *
 * @param {string} payload
 */
var create = function(payload) {
    return userValidator
        .validate(payload)
        .then(function(resolved) {
            resolved.value.password = userHelper.generateHash(resolved.value.password);
            return User.create(resolved.value).then(function(createdUser) {
                resolved.value = createdUser;
                return when.resolve(resolved);
            }, function() {
                var bimError = new BimError(
                    errors.user.internal.code,
                    null,
                    errors.user.internal.message
                );
                resolved.bim.add(bimError);
                return when.reject({
                    value: resolved.value,
                    bim: resolved.bim
                });
            });
        });
};

module.exports = {
    create: create
};
