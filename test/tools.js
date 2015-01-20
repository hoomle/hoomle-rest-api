'use strict';

var _ = require('lodash');

/**
 * Build string to field "Authorization" HTTP Request with username and password
 *
 * @param {string} username
 * @param {string} password
 * @returns {string}
 */
module.exports.buildBasicAuthorization = function(username, password) {
    var hashBase64 = new Buffer(username + ':' + password).toString('base64');
    return 'Basic ' + hashBase64;
};

/**
 * Return true if errors contain specific value
 *
 * @param {Array} errors
 * @param {string} code
 * @param {string} path
 * @returns {boolean}
 */
module.exports.hasError = function(errors, code, path) {
    var r = false;
    _(errors).each(function(error) {
        if (path && _.has(error, 'code') && _.has(error, 'path') && error.code === code && error.path === path) {
            r = true;
        } else if (_.has(error, 'code') && error.code === code) {
            r = true;
        }
    });

    return r;
};
