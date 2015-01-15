'use strict';

var homepageValidator   = require('../validator').Homepage,
    errors              = require('../validator').Errors,
    when                = require('when'),
    BimError            = require('../bim/bimError'),
    Homepage            = require('../models').Homepage,
    ObjectId            = require('mongoose').Types.ObjectId;

/**
 * Create an homepage
 *
 * @param {string} payload
 */
var create = function(payload) {
    return homepageValidator
        .validate(payload)
        .then(function(resolved) {
            resolved.value.owner = new ObjectId(resolved.value.owner);
            return Homepage.create(resolved.value).then(function(createdHomepage) {
                resolved.value = createdHomepage;
                return when.resolve(resolved);
            }, function() {
                var bimError = new BimError(
                    errors.homepage.internal.code,
                    null,
                    errors.homepage.internal.message
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
