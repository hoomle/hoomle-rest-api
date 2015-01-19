'use strict';

var InternalBim = require('../bim/internalBim'),
    Bim         = require('../bim/bim'),
    _           = require('lodash');

/**
 * Error handler
 *
 * @param {Request}     req
 * @param {Response}    res
 */
var errorHandler = function(err, req, res, next) {
    var bim;
    if (err.isBim !== undefined) {
        bim = err;
    } else if (_.has(err, 'code')) {
        bim = new Bim();
        bim.status = err.code;
    } else {
        bim = new InternalBim();
    }

    if (err.headers) {
        res.set(err.headers);
    }

    res
        .contentType('application/json')
        .status(bim.status)
        .send(bim.render('json'));
};

module.exports.errorHandler = errorHandler;
