'use strict';

var getSchema = function(schemaName, schemaNamespace) {
    var schemaList = require('../schema/' + schemaName);

    if (schemaList[schemaNamespace] === undefined) {
        throw new Error('The schema ' + schemaNamespace + ' does not exist');
    }

    return schemaList[schemaNamespace];
};

module.exports = {
    getSchema: getSchema
};
