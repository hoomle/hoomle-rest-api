'use strict';

var when                = require('when'),
    errors              = require('../validator').Errors,
    InternalBim         = require('../bim/internalBim'),
    Homepage            = require('../model/index').Homepage;

/**
 * Create an homepage
 *
 * @param {Object} homepage
 */
var create = function(homepage) {
    return Homepage
        .create(homepage)
        .then(function(createdHomepage) {
            return when.resolve(createdHomepage);
        }, function() {
            return when.reject({
                value: homepage,
                bim: new InternalBim(
                    errors.homepage.internal.code,
                    errors.homepage.internal.message
                )
            });
        });
};

module.exports = {
    create: create
};
