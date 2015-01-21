'use strict';

var userManager         = require('./user'),
    homepageManager     = require('./homepage');

module.exports = {
    User        : userManager,
    Homepage    : homepageManager
};
