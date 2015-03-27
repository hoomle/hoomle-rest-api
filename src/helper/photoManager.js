'use strict';

var resolvePathFromUploadFolder = function(filename) {
    return __dirname + '/../../uploads/' + filename;
};

module.exports = {
    resolvePathFromUploadFolder: resolvePathFromUploadFolder
};
