'use strict';

var configuration   = require('../../config/configuration'),
    arrayHelper     = require('../../helper/array');

/**
 * Decorate the homepage object to respect the hateoas principles
 *
 * @param {Homepage} homepage
 */
function hateoasize(homepage) {
    arrayHelper.pushToPropertyUnknow(homepage, 'links', {
        rel     : 'self',
        href    : configuration.getRootUrl() + '/homepages/' + homepage.slug
    });
    arrayHelper.pushToPropertyUnknow(homepage, 'links', {
        rel     : 'owner',
        href    : configuration.getRootUrl() + '/users/' + homepage.owner
    });
    return homepage;
}

module.exports = hateoasize;
