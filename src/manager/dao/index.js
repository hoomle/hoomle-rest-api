'use strict';

var userDao         = require('./user'),
    homepageDao     = require('./homepage'),
    hoomsDao        = require('./hooms');

module.exports = {
    User        : userDao,
    Homepage    : homepageDao,
    Hooms       : hoomsDao
};
