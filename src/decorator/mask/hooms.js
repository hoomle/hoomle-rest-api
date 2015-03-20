'use strict';

var maskUser        = require('./user'),
    maskHomepage    = require('./homepage');

/**
 * Hide some data of hooms before expose it to the final users
 * @param {Object} hooms
 */
function mask(hooms) {
    hooms.user = maskUser(hooms.user);
    hooms.homepage = maskHomepage(hooms.homepage);

    return hooms;
}

module.exports = mask;
