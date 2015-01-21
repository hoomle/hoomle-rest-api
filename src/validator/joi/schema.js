'use strict';

var getSchema = function(schemaName, schemaNamespace) {
    var schemaList = require('../schema/' + schemaName);
    return schemaList[schemaNamespace] !== undefined ? schemaList[schemaNamespace] : schemaList['default'];
};

module.exports = {
    getSchema: getSchema
};
