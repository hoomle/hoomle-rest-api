'use strict';

var _               = require('lodash'),
    sprintf         = require('sprintf-js').sprintf,
    configuration   = require('../../config/configuration');

/**
 * Add asset link
 * @param {Homepage} homepage
 */
function staticLink(homepage) {
    if (_.has(homepage, 'photoProfile')) {
        homepage.photoProfile = sprintf('%s/%s', configuration.staticUrl, homepage.photoProfile);
    }

    return homepage;
}

module.exports = staticLink;
