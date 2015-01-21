'use strict';

var objectHelper = require('../../helpers/object');

/**
 * Hide some data of user before expose it to the final users
 * @param {User} user
 */
function mask(user) {
    return objectHelper.removeProperties([
        'password',
        '__v'
    ], user);
}

module.exports = mask;
