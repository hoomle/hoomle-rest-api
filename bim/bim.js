'use strict';

var _ = require('lodash');

function Bim() {
    this.errors = [];
    this.status = 400;
}

Bim.prototype.add = function(error) {
    if (error === undefined || error === null) {
        return;
    }

    this.errors.push(error);
};

Bim.prototype.has = function(path) {
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

module.exports = Bim;
