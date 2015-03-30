'use strict';

var when = require('when'),
    gm   = require('gm');

/**
 * Returns the size (WxH) of the image
 * @param filepath
 * @returns {Promise}
 */
var size = function(filepath) {
    return when.promise(function(resolve, reject) {
        gm(filepath).size(function(err, value) {
            if (err) {
                return reject(err);
            }
            return resolve(value);
        });
    });
};

/**
 * Returns the image format (gif, jpeg, png, etc)
 * @param filepath
 * @returns {Promise}
 */
var format = function(filepath) {
    return when.promise(function(resolve, reject) {
        gm(filepath).format(function(err, value) {
            if (err) {
                return reject(err);
            }
            return resolve(value);
        });
    });
};

/**
 * Returns the image color depth
 * @param filepath
 * @returns {Promise}
 */
var depth = function(filepath) {
    return when.promise(function(resolve, reject) {
        gm(filepath).depth(function(err, value) {
            if (err) {
                return reject(err);
            }
            return resolve(value);
        });
    });
};

/**
 * Returns the number of colors
 * @param filepath
 * @returns {Promise}
 */
var color = function(filepath) {
    return when.promise(function(resolve, reject) {
        gm(filepath).color(function(err, value) {
            if (err) {
                return reject(err);
            }
            return resolve(value);
        });
    });
};

/**
 * Returns the image resolution
 * @param filepath
 * @returns {Promise}
 */
var res = function(filepath) {
    return when.promise(function(resolve, reject) {
        gm(filepath).res(function(err, value) {
            if (err) {
                return reject(err);
            }
            return resolve(value);
        });
    });
};

/**
 * Returns image filesize
 * @param filepath
 * @returns {Promise}
 */
var filesize = function(filepath) {
    return when.promise(function(resolve, reject) {
        gm(filepath).filesize(function(err, value) {
            if (err) {
                return reject(err);
            }
            return resolve(value);
        });
    });
};

/**
 * Returns all image data available
 * @param {String} filepath
 * @returns {Promise}
 */
var identify = function(filepath) {
    return when.promise(function(resolve, reject) {
        gm(filepath).identify(function(err, value) {
            if (err) {
                return reject(err);
            }
            return resolve(value);
        });
    });
};

/**
 * Returns the EXIF orientation of the image
 * @param filepath
 * @returns {Promise}
 */
var orientation = function(filepath) {
    return when.promise(function(resolve, reject) {
        gm(filepath).orientation(function(err, value) {
            if (err) {
                return reject(err);
            }
            return resolve(value);
        });
    });
};

module.exports = {
    size: size,
    format: format,
    depth: depth,
    color: color,
    res: res,
    filesize: filesize,
    identify: identify,
    orientation: orientation
};
