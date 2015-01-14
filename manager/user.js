'use strict';

var userValidator   = require('../validator').User,
    errors          = require('../validator').Errors,
    when            = require('when'),
    BimError        = require('../bim/bimError'),
    User            = require('../models').User;

/**
 * Create an user
 *
 * @param {string} payload
 */
var create = function(payload) {
    return userValidator
        .validate(payload)
        .then(function(resolved) {
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
