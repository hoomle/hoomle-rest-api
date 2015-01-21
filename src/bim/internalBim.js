'use strict';

var Bim         = require('./bim'),
    BimError    = require('./bimError'),
    errors      = require('../validator/errors');

/**
 * InternalBim
 * @constructor
 */
function InternalBim(/* code, message */) {
    this.errors = [];
    this.status = 500;

    var code = (arguments.length >= 1) ? arguments[0] : errors.global.internal.code;
    var message = (arguments.length >= 2) ? arguments[1] : errors.global.internal.message;
    this.add(new BimError(
        code,
        null,
        message
    ));
}

InternalBim.prototype = Object.create(Bim.prototype);

module.exports = InternalBim;
