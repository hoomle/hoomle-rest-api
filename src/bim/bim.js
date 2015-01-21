'use strict';

var _ = require('lodash');

function Bim() {
    this.errors = [];
    this.status = 400;
}

Bim.prototype.add = function(error) {
    if (error === undefined || error === null || error.isBim === undefined || error.isBim === false) {
        return;
    }

    this.errors.push(error);
};

Bim.prototype.hasErrorWithPath = function(path) {
    if (this.errors.length === 0) {
        return false;
    }

    var hasError = false;

    _.forEach(this.errors, function(error) {
        if (error.path === path) {
            hasError = true;
        }
    });

    return hasError;
};

Bim.prototype.isValid = function() {
    return this.errors.length === 0;
};

Bim.prototype.render = function(format) {
    var engine = require('./render/' + format);
    return engine(this);
};

Bim.prototype.isBim = true;

module.exports = Bim;
