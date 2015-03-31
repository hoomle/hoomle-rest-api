'use strict';

var _               = require('lodash'),
    homepageStatic  = require('./homepage');

/**
 * Add asset link
 * @param {Hooms} hooms
 */
function staticLink(hooms) {
    if (_.has(hooms, 'homepage')) {
        hooms.homepage = homepageStatic(hooms.homepage);
    }

    return hooms;
}

module.exports = staticLink;
