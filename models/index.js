'use strict';

var user            = require('./user'),
    mongo           = require('../config/mongo');

module.exports = {
    User: user(mongo.mongoose, mongo.connection)
};
