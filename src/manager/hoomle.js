'use strict';

var when            = require('when'),
    hoomleValidator = require('../validator').Hoomle,
    errors          = require('../validator').Errors,
    userHelper      = require('../helper/user'),
    BimError        = require('../bim/bimError'),
    User            = require('../model').User,
    Homepage        = require('../model').Homepage;

/**
 * Create an user
 *
 * @param {string} payload
 */
var create = function(payload) {
    return hoomleValidator
        .validate(payload, 'creation')
        .then(function(resolved) {
            var newUser = {
                email: resolved.value.email,
                password: userHelper.generateHash(resolved.value.password),
                displayName: resolved.value.displayName
            };

            return User.create(newUser).then(function(createdUser) {
                var newHomepage = {
                    slug: resolved.value.slug,
                    owner: createdUser
                };

                return Homepage.create(newHomepage).then(function(createdHomepage) {
                    resolved.value = {
                        user: createdUser.toObject(),
                        homepage: createdHomepage.toObject()
                    };

                    return when.resolve(resolved);
                });
            }).then(null, function(resolved) {
                var bimError = new BimError(
                    errors.hoomle.internal.code,
                    null,
                    errors.hoomle.internal.message
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
