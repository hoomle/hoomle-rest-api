'use strict';

var configuration = require('../../src/config/configuration');

// Override the configuration because we are in test mode
configuration.mongodb = process.env.MONGODB_PATH || 'mongodb://localhost/hoomletest';
configuration.env = 'test';

module.exports = require('../../src/config/app');
