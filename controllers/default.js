'use strict';

var _               = require('lodash'),
    InternalBim     = require('../bim/internalBim');

/**
 * Error handler
 *
 * @param {Request}     req
 * @param {Response}    res
 */
var errorHandler = function(err, req, res) {
    var bim;
    if (err.isBim !== undefined) {
        bim = err;
    } else {
        bim = new InternalBim();
    }

    res
        .contentType('application/json')
        .status(bim.status)
        .send(bim.render('json'));
};

module.exports.errorHandler = errorHandler;
