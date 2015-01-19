'use strict';

var userDao     = require('../manager/dao').User,
    _           = require('lodash');

/**
 * Load the user by its ID and set it on the Request object
 *
 * @param {Request} req
 * @param {Response} res
 * @param next
 * @returns {*}
 */
module.exports = function(req, res, next) {
    if (_.has(req, 'user') && _.has(req.user, 'id') && !_.isEmpty(req.user.id)) {
        userDao.findOneReadOnlyById(req.user.id)
            .then(function(user) {
                if (user === null) {
                    next();
                    return;
                }
                req.user = user;
                next();
            }, function() {
                next();
            });
    }
};
