'use strict';

var configuration = require('../../src/config/configuration');

// Override the configuration because we are in test mode
configuration.mongodb = process.env.HOOLE_API_MONGODB_PATH || 'mongodb://localhost/hooletest';
configuration.env = 'test';

module.exports = require('../../src/config/app');
