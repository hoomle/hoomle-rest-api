'use strict';

var HomepageDao = require('./homepage'),
    UserDao     = require('./user'),
    when        = require('when');

/**
 * Find hooms by slug.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} slug
 */
var findOneReadOnlyBySlug = function(slug) {
    return HomepageDao.findOneReadOnlyBySlug(slug)
        .then(function(homepage) {
            if (!homepage) {
                return null;
            }

            return UserDao.findOneReadOnlyById(homepage.owner)
                .then(function(user) {
                    if (!user) {
                        return null;
                    }

                    return {
                        user: user,
                        homepage: homepage
                    };
                });
        });
};

module.exports = {
    findOneReadOnlyBySlug: findOneReadOnlyBySlug
};
