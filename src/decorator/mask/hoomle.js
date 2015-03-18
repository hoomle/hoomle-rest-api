'use strict';

var maskUser        = require('./user'),
    maskHomepage    = require('./homepage');

/**
 * Hide some data of hoomle before expose it to the final users
 * @param {Object} hoomle
 */
function mask(hoomle) {
    hoomle.user = maskUser(hoomle.user);
    hoomle.homepage = maskHomepage(hoomle.homepage);

    return hoomle;
}

module.exports = mask;
