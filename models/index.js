'use strict';

var user            = require('./user'),
    homepage        = require('./homepage'),
    accessToken     = require('./accessToken'),
    mongo           = require('../config/mongo');

module.exports = {
    User: user(mongo.mongoose, mongo.connection),
    Homepage: homepage(mongo.mongoose, mongo.connection),
    AccessToken: accessToken(mongo.mongoose, mongo.connection)
};
