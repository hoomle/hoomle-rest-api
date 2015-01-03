'use strict';

var _                   = require('lodash'),
    Bim                 = require('../../bim'),
    bimErrorAdapter     = require('./bimErrorAdapter');

/**
 * Adapter errors from Joi (https://github.com/hapijs/joi) to Bim
 *
 * @param {array} joiErrors
 * @returns {Bim}
 */
function bimAdapter(joiErrors) {
    var bim = new Bim();

    if (_.has(joiErrors, 'details') && !_.isArray(joiErrors.details) && joiErrors.details.length < 1) {
        _.forEach(joiErrors.details, function(error) {
            bim.add(bimErrorAdapter(error));
        });
    }

    return bim;
}

module.exports = bimAdapter;
