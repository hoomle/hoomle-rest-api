'use strict';

var objectHelper = require('../../helper/object');

/**
 * Hide some data of user before expose it to the final users
 * @param {Homepage} homepage
 */
function mask(homepage) {
    return objectHelper.removeProperties([
        '__v',
        'updatedAt',
        'createdAt'
    ], homepage);
}

module.exports = mask;
