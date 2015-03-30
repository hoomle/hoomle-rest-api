'use strict';

var configuration   = require('../config/configuration'),
    when            = require('when'),
    gm              = require('gm'),
    fs              = require('fs'),
    gmPromisy       = require('../helper/gmPromisify');

var resolvePathFromUploadFolder = function(filename) {
    return configuration.uploadAbsPath + '/' + filename;
};

var savePhotoFromUpload = function(filename) {
    var filepath = resolvePathFromUploadFolder(filename);

    return gmPromisy.identify(filepath)
        .then(function(resolved) {
            var size = resolved.size;
            var crop = {
                width: size.width,
                height: size.height,
                x: 0,
                y: 0
            };

            if (size.width === size.height) {
                // Do Nothing
            } else if (size.width > size.height) {
                crop.width = size.height;
                crop.x = Math.round((size.width - size.height) / 2);
            } else if (size.width < size.height) {
                crop.height = size.width;
                crop.y = Math.round((size.height - size.width) / 2);
            }

            var name = (new Date()).getTime() + '-' + Math.floor((Math.random() * 1000000) + 1) + '.jpg';

            return when.promise(function(resolve, reject) {
                gm(filepath)
                    .autoOrient()
                    .setFormat('jpeg')
                    .crop(crop.width, crop.height, crop.x, crop.y)
                    .geometry(1500, 1500, '>')
                    .write(configuration.staticAbsPath + '/' + name, function(err, file) {
                        if (err) {
                            return reject(err);
                        }

                        try {
                            fs.unlinkSync(filepath);
                        } catch (err) {
                            console.log('Unable to delete the file ' + filepath);
                        }

                        return resolve(name);
                    });
            });
        });
};

module.exports = {
    resolvePathFromUploadFolder: resolvePathFromUploadFolder,
    savePhotoFromUpload: savePhotoFromUpload
};
