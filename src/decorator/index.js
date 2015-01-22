'use strict';

var _ = require('lodash');

/**
 * Apply a list of decorators to an object
 *
 * @param {Object} data Object to decorate
 * @param {Array} decorators List of function which are able to decorate an object
 * @returns {Object}
 */
var decorate = function(data, decorators) {
    if (!_.isArray(decorators) || decorators.length === 0) {
        return data;
    }

    _(decorators).each(function(func) {
        data = func(data);
    });

    return data;
};

module.exports = {
    decorate: decorate
};
