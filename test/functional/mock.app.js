'use strict';

var configuration = require('../../src/config/configuration');

// Override the configuration because we are in test mode
configuration.mongodb = process.env.HOOLE_API_MONGODB_PATH || 'mongodb://localhost/hooletest';
configuration.env = 'test';

// Load data for tests
require('../fixtures.load.js');

module.exports = require('../../src/config/app');
