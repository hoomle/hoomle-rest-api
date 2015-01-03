'use strict';

var when            = require('when'),
    schemaUser      = require('./schema/user'),
    joi             = require('joi'),
    BimAdapter      = require('../bim/adapters/joi/bimAdapter');

var validate = function(value /*, schemaName */) {
    var schemaName = (arguments.length > 1) ? arguments[1] : 'default';
    var schema = schemaUser[schemaName] !== undefined ? schemaUser[schemaName] : schemaUser['default'];
    var options = {
        abortEarly: false
    };

    var promise = when.promise(function(resolve, reject) {
        joi.validate(value, schema, options, function(err, valueValidated) {
            if (err === null) {
                resolve(valueValidated);
            }
            reject(new BimAdapter(err));
        });
    });

    return promise;
};

module.exports = {
    validate: validate
};
