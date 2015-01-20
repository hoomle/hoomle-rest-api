'use strict';

var InternalBim = require('../bim/internalBim'),
    Bim         = require('../bim/bim'),
    BimError    = require('../bim/bimError'),
    _           = require('lodash');

/**
 * Error handler
 *
 * @param {function}     err
 * @param {Request}     req
 * @param {Response}    res
 */
var errorHandler = function(err, req, res) {
    var bim;
    if (err.isBim !== undefined) {
        bim = err;
    } else if (_.has(err, 'code')) {
        bim = new Bim();
        bim.status = err.code;

        // Check if it is an OAuth2 error
        if (_.has(err, 'error') && _.has(err, 'error_description')) {
            bim.add(new BimError(err.error, null, err.error_description));
        }
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
