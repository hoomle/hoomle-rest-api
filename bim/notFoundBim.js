'use strict';

var Bim = require('./bim'),
    BimError = require('./bimError'),
    errors = require('../validator/errors');

/**
 * NotFoundBim
 * @constructor
 */
function NotFoundBim(/* code, message */) {
    this.errors = [];
    this.status = 404;

    var code = (arguments.length >= 1) ? arguments[0] : errors.global.not_found.code;
    var message = (arguments.length >= 2) ? arguments[1] : errors.global.not_found.message;
    this.add(new BimError(
        code,
        null,
        message
    ));
}

NotFoundBim.prototype = Object.create(Bim.prototype);

module.exports = NotFoundBim;
