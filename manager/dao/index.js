'use strict';

var userDao         = require('./user'),
    homepageDao     = require('./homepage');

module.exports = {
    User        : userDao,
    Homepage    : homepageDao
};
