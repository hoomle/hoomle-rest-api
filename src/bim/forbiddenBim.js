'use strict';

var Bim         = require('./bim'),
    BimError    = require('./bimError'),
    errors      = require('../validator/errors');

/**
 * ForbiddenBim
 * @constructor
 */
function ForbiddenBim(/* code, message */) {
    this.errors = [];
    this.status = 403;

    var code = (arguments.length >= 1) ? arguments[0] : errors.global.forbidden.code;
    var message = (arguments.length >= 2) ? arguments[1] : errors.global.forbidden.message;
    this.add(new BimError(
        code,
        null,
        message
    ));
}

ForbiddenBim.prototype = Object.create(Bim.prototype);

module.exports = ForbiddenBim;
