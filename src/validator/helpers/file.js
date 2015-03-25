'use strict';

var gm      = require('gm'),
    fs      = require('fs'),
    _       = require('lodash'),
    when    = require('when');


var format = function(filepath, formats) {
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
                    filepath: filepath,
                    code: 'format.not_supported'
                });
            }

            return resolve(filepath);
        });
    });
};

var maxWidth = function(filepath, limit) {
    return when.promise(function(resolve, reject) {
        gm(filepath).size(function(err, size) {
            if (err || size.width > limit) {
                return reject({
                    filepath: filepath,
                    code: 'width.too_high'
                });
            }

            return resolve(filepath);
        });
    });
};

var maxHeight = function(filepath, limit) {
    return when.promise(function(resolve, reject) {
        gm(filepath).size(function(err, size) {
            if (err || size.height > limit) {
                return reject({
                    filepath: filepath,
                    code: 'height.too_high'
                });
            }

            return resolve(filepath);
        });
    });
};

var minWidth = function(filepath, limit) {
    return when.promise(function(resolve, reject) {
        gm(filepath).size(function(err, size) {
            if (err || size.width < limit) {
                return reject({
                    filepath: filepath,
                    code: 'width.too_low'
                });
            }

            return resolve(filepath);
        });
    });
};

var minHeight = function(filepath, limit) {
    return when.promise(function(resolve, reject) {
        gm(filepath).size(function(err, size) {
            if (err || size.height < limit) {
                return reject({
                    filepath: filepath,
                    code: 'height.too_low'
                });
            }

            return resolve(filepath);
        });
    });
};

module.exports = {
    format: format,
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    minWidth: minWidth,
    minHeight: minHeight,
};
