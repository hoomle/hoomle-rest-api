'use strict';

var validate            = require('./joi/validate'),
    joiSchema           = require('./joi/schema'),
    homepageValidator   = require('./homepage'),
    userValidator       = require('./user');

/**
 * Valid the values to record a new user
 *
 * @param {Object} value - Hoomle data to validate
 * @param {string} schemaName
 * @returns {Promise}
 */
var validateHooms = function(value, schemaName) {
    var schema = joiSchema.getSchema('hooms', schemaName);
    var promise = validate(value, schema);

    var promiseEmailAlreadyExist = function(resolved) {
        return userValidator._emailAlreadyExist(resolved.value, resolved.bim, schema, 'email');
    };

    var promiseSlugAlreadyExist = function(resolved) {
        return homepageValidator._slugAlreadyExist(resolved.value, resolved.bim, schema, 'slug');
    };

    return promise
        .then(promiseEmailAlreadyExist, promiseEmailAlreadyExist)
        .then(promiseSlugAlreadyExist, promiseSlugAlreadyExist);
};

module.exports = {
    validate: validateHooms
};
