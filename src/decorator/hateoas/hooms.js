'use strict';

var configuration   = require('../../config/configuration'),
    arrayHelper     = require('../../helper/array');

/**
 * Decorate the hooms object to respect the hateoas principles
 *
 * @param {Object} hooms
 */
function hateoasize(hooms) {
    arrayHelper.pushToPropertyUnknow(hooms, 'links', {
        rel     : 'user',
        href    : configuration.getRootUrl() + '/users/' + hooms.user._id
    });
    return hooms;
}

module.exports = hateoasize;
