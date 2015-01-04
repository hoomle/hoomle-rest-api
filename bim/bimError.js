'use strict';

/**
 * BimError
 * @constructor
 */
function BimError(/* code, path, message */) {
    this.code = (arguments.length >= 1) ? arguments[0] : null;
    this.path = (arguments.length >= 2) ? arguments[1] : null;
    this.message = (arguments.length >= 3) ? arguments[2] : null;
}

module.exports = BimError;
