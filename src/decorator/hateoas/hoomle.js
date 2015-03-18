'use strict';

var configuration   = require('../../config/configuration'),
    arrayHelper     = require('../../helper/array');

/**
 * Decorate the hoomle object to respect the hateoas principles
 *
 * @param {Object} hoomle
 */
function hateoasize(hoomle) {
    arrayHelper.pushToPropertyUnknow(hoomle, 'links', {
        rel     : 'user',
        href    : configuration.getRootUrl() + '/users/' + hoomle.user._id
    });
    return hoomle;
}

module.exports = hateoasize;
