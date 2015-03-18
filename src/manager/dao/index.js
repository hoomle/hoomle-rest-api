'use strict';

var userDao         = require('./user'),
    homepageDao     = require('./homepage'),
    hoomleDao       = require('./hoomle');

module.exports = {
    User        : userDao,
    Homepage    : homepageDao,
    Hoomle      : hoomleDao
};
