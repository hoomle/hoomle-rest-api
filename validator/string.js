'use strict';

var errors      = require('./errors'),
    when        = require('when');

var isDocumentId = function(str) {
    if (!/^[0-9a-fA-F]{24}$/.test(str)) {
        return when.reject(errors.string.documentid_invalid);
    }
    return when.resolve(str);
};

module.exports = {
    isDocumentId: isDocumentId
};
