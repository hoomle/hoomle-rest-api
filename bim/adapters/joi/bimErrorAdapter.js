'use strict';

var _           = require('lodash'),
    BimError    = require('../../bimError');

/**
 * Adapter error from Joi (https://github.com/hapijs/joi) to BimError
 *
 * @param {Object} joiError
 * @returns {BimError}
 */
function bimErrorAdapter(joiError) {
    if (!_.has(joiError, 'path') || !_.has(joiError, 'type')) {
        return null;
    }

    return new BimError(joiError.type, joiError.path);
}

module.exports = bimErrorAdapter;
