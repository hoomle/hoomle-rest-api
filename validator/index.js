'use strict';

var userValidator       = require('./user'),
    stringValidator     = require('./string'),
    errors              = require('./errors'),
    homepageValidator   = require('./homepage');

module.exports = {
    User: userValidator,
    String: stringValidator,
    Homepage: homepageValidator,
    Errors: errors
};
