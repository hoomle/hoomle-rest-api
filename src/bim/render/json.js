'use strict';

/**
 * Render an Bim object to JSON
 *
 * @param {Bim} bim
 */
module.exports = function(bim) {
    return {
        errors: bim.errors
    };
};
