var _ = require('lodash');

/**
 * Error handler
 *
 * @param {Request}     request
 * @param {Response}    response
 * @param {function}    next
 */
var errorHandler = function(err, req, res, next) {

    console.log(err);

    var error = {};
    error.message = _.isString(err) ? err : (_.isObject(err) ? err.message : 'Unknown Error');
    
    if (_.has(err, 'code')) {
        error.code = err.code;
    }
    res.status(err.status || 500);
    res.contentType('application/json');
    res.send(error);
};

module.exports.errorHandler = errorHandler;