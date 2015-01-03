'use strict';

var userValidator       = require('./user'),
    stringValidator     = require('./string'),
    errors              = require('./errors');

module.exports = {
    User: userValidator,
    String: stringValidator,
    Errors: errors
};
