'use strict';

function BimError(code, path) {
    this.code = code;
    this.path = path;
}

module.exports = BimError;
