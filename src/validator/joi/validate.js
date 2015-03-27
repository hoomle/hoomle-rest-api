'use strict';

var when            = require('when'),
    joi             = require('joi'),
    joiBimAdapter   = require('../../bim/adapters/joi/bimAdapter'),
    Bim             = require('../../bim/bim'),
    objectAssign    = require('object-assign');

module.exports = function(value, schema, options) {
    options = objectAssign({
        abortEarly: false
    }, options);

    return when.promise(function(resolve, reject) {
        joi.validate(value, schema, options, function(err, valueValidated) {
            if (err === null) {
                resolve({
                    value: valueValidated,
                    bim: new Bim()
                });
            } else {
                var bim = joiBimAdapter(err);
                reject({
                    value: value,
                    bim: bim
                });
            }
        });
    });
};
