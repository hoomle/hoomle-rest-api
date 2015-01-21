'use strict';

var userValidator       = require('./user'),
    errors              = require('./errors'),
    homepageValidator   = require('./homepage');

module.exports = {
    User: userValidator,
    Homepage: homepageValidator,
    Errors: errors
};
