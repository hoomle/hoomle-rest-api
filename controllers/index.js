'use strict';

var defaultCtrl     = require('./default'),
    usersCtrl       = require('./users'),
    homepagesCtrl   = require('./homepages');

module.exports = {
    Default: defaultCtrl,
    User: usersCtrl,
    Homepage: homepagesCtrl
};
