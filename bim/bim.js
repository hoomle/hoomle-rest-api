'use strict';

function Bim() {
    this.errors = [];
}

Bim.prototype.add = function(error) {
    if (error === undefined || error === null) {
        return;
    }

    this.errors.push(error);
};

module.exports = Bim;
