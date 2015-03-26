'use strict';

var gm      = require('gm'),
    fs      = require('fs'),
    _       = require('lodash'),
    when    = require('when'),
    sprintf = require("sprintf-js").sprintf;

var isImage = function(filepath) {
    return when.promise(function(resolve, reject) {
        gm(filepath).format(function(err, format) {
            if (err || !format) {
                return reject({
                    value: filepath,
                    code: 'photo.invalid',
                    message: 'This file is not a valid image.'
                });
            }
            return resolve(filepath);
        });
    });
};

var format = function(filepath, formats) {
    return isImage(filepath)
        .then(function() {
            return when.promise(function(resolve, reject) {
                var formatsExpected = [];
                if (!_.isArray(formats)) {
                    formatsExpected.push(formats);
                } else {
                    formatsExpected = formats;
                }

                gm(filepath).format(function(err, format) {
                    if (err || _.indexOf(formatsExpected, format.toLowerCase()) < 0) {
                        return reject({
                            value: filepath,
                            code: 'photo.invalid_format',
                            message: sprintf(
                                'The image format "%s" is not supported, we support "%s" formats',
                                format.toLowerCase(),
                                formatsExpected.join(',')
                            )
                        });
                    }
                    return resolve(filepath);
                });
            });
        });
};

var maxWidth = function(filepath, maxExpectedWidth) {
    return isImage(filepath)
        .then(function() {
            return when.promise(function(resolve, reject) {
                gm(filepath).size(function(err, size) {
                    if (err || size.width > maxExpectedWidth) {
                        return reject({
                            value: filepath,
                            code: 'photo.width_too_big',
                            message: sprintf(
                                'The image width is too big (%spx). Allowed maximum width is %spx.',
                                size.width,
                                maxExpectedWidth
                            )
                        });
                    }
                    return resolve(filepath);
                });
            });
        });
};

var maxHeight = function(filepath, maxExpectedHeight) {
    return isImage(filepath)
        .then(function() {
            return when.promise(function(resolve, reject) {
                gm(filepath).size(function(err, size) {
                    if (err || size.height > maxExpectedHeight) {
                        return reject({
                            value: filepath,
                            code: 'photo.height_too_big',
                            message: sprintf(
                                'The image height is too big (%spx). Allowed maximum height is %spx.',
                                size.height,
                                maxExpectedHeight
                            )
                        });
                    }
                    return resolve(filepath);
                });
            });
        });
};

var minWidth = function(filepath, minExpectedWidth) {
    return isImage(filepath)
        .then(function() {
            return when.promise(function(resolve, reject) {
                gm(filepath).size(function(err, size) {
                    if (err || size.width < minExpectedWidth) {
                        return reject({
                            value: filepath,
                            code: 'photo.width_too_small',
                            message: sprintf(
                                'The image width is too small (%spx). Minimum width expected is %spx.',
                                size.width,
                                minExpectedWidth
                            )
                        });
                    }
                    return resolve(filepath);
                });
            });
        });
};

var minHeight = function(filepath, minExpectedHeight) {
    return isImage(filepath)
        .then(function() {
            return when.promise(function(resolve, reject) {
                gm(filepath).size(function(err, size) {
                    if (err || size.height < minExpectedHeight) {
                        return reject({
                            value: filepath,
                            code: 'photo.height_too_small',
                            message: sprintf(
                                'The image height is too small (%spx). Minimum height expected is %spx.',
                                size.height,
                                minExpectedHeight
                            )
                        });
                    }
                    return resolve(filepath);
                });
            });
        });
};

var maxImageSize = function(filepath, maxExpectedWidth, maxExpectedHeight) {
    return isImage(filepath)
        .then(function() {
            return when.promise(function(resolve, reject) {
                gm(filepath).size(function(err, size) {
                    if (err || size.width > maxExpectedWidth || size.height > maxExpectedHeight) {
                        return reject({
                            value: filepath,
                            code: 'photo.image_size_too_big',
                            message: sprintf(
                                'The image size is too big (%sx%s). Maximum size expected is %sx%s.',
                                size.width,
                                size.height,
                                maxExpectedWidth,
                                maxExpectedHeight
                            )
                        });
                    }
                    return resolve(filepath);
                });
            });
        });
};

var minImageSize = function(filepath, minExpectedWidth, minExpectedHeight) {
    return isImage(filepath)
        .then(function() {
            return when.promise(function(resolve, reject) {
                gm(filepath).size(function(err, size) {
                    if (err || size.width < minExpectedWidth || size.height < minExpectedHeight) {
                        return reject({
                            value: filepath,
                            code: 'photo.image_size_too_small',
                            message: sprintf(
                                'The image size is too small (%sx%s). Minimum size expected is %sx%s.',
                                size.width,
                                size.height,
                                minExpectedWidth,
                                minExpectedHeight
                            )
                        });
                    }
                    return resolve(filepath);
                });
            });
        });
};

/**
 * Check if the size of the file respect the max size specified
 *
 * @param filepath absolute path of the file to test
 * @param maxSize
 * @returns {Promise}
 */
var maxSize = function(filepath, maxSize) {
    return isImage(filepath)
        .then(function() {
            var fileStat = fs.statSync(filepath);
            if (!fileStat || fileStat.size === undefined || fileStat.size > maxSize) {
                // TODO Return size with readable value (1000000 = 1MB)
                return when.reject({
                    value: filepath,
                    code: 'photo.size_too_big',
                    message: sprintf('The file is too large (%s). Allowed maximum size is %s.', fileStat.size, maxSize)
                });
            }
            return when.resolve(filepath);
        });
};

module.exports = {
    isImage: isImage,
    format: format,
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    minWidth: minWidth,
    minHeight: minHeight,
    maxImageSize: maxImageSize,
    minImageSize: minImageSize,
    maxSize: maxSize
};
