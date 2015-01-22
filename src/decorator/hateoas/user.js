'use strict';

var configuration   = require('../../config/configuration'),
    arrayHelper     = require('../../helper/array');

/**
 * Decorate the user object to respect the hateoas principles
 *
 * @param {User} user
 */
function hateoasize(user) {
    arrayHelper.pushToPropertyUnknow(user, 'links', {
        rel     : 'self',
        href    : configuration.getRootUrl() + '/users/' + user._id
    });
    return user;
}

module.exports = hateoasize;
