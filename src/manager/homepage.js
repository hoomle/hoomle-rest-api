'use strict';

var when                = require('when'),
    errors              = require('../validator').Errors,
    InternalBim         = require('../bim/internalBim'),
    homepageDao         = require('./dao').Homepage,
    Homepage            = require('../model/index').Homepage;

/**
 * Create an homepage
 *
 * @param {Object} homepage
 */
var create = function(homepage) {
    return Homepage
        .create(homepage)
        .then(function(createdHomepage) {
            return when.resolve(createdHomepage);
        }, function() {
            return when.reject({
                value: homepage,
                bim: new InternalBim(
                    errors.homepage.internal.code,
                    errors.homepage.internal.message
                )
            });
        });
};

/**
 * Get homepage by its slug and its user ID
 *
 * @param {String} slug
 * @param {String} userId
 */
var findOneReadOnlyBySlugAndUser = function(slug, userId) {
    return homepageDao
        .findOneReadOnlyBySlugAndUser(slug, userId)
        .then(function(homepage) {
            return when.resolve(homepage);
        }, function() {
            return when.reject({
                value: null,
                bim: new InternalBim(
                    errors.homepage.internal.code,
                    errors.homepage.internal.message
                )
            });
        });
};

/**
 * Update homepage photo profile
 *
 * @param {String} slug
 * @param {String} userId
 */
var updatePhotoProfile = function(photoName, slug, userId) {
    return homepageDao
        .findOneBySlugAndUser(slug, userId)
        .then(function(homepage) {
            if (!homepage) {
                return when.reject();
            }

            return when.promise(function(resolve, reject) {
                homepage.updatedAt = Date.now();
                homepage.photoProfile = photoName;
                homepage.save(function(err) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(homepage);
                });
            });
        }).then(null, function() {
            return when.reject({
                value: null,
                bim: new InternalBim(
                    errors.homepage.internal.code,
                    errors.homepage.internal.message
                )
            });
        });
};

/**
 * Get homepages by user ID
 *
 * @param {String} userId
 */
var findByUser = function(userId) {
    return homepageDao
        .findReadOnlyByUser(userId)
        .then(function(homepages) {
            return when.resolve(homepages);
        }, function() {
            return when.reject({
                value: null,
                bim: new InternalBim(
                    errors.homepage.internal.code,
                    errors.homepage.internal.message
                )
            });
        });
};

module.exports = {
    create: create,
    findOneReadOnlyBySlugAndUser: findOneReadOnlyBySlugAndUser,
    updatePhotoProfile: updatePhotoProfile,
    findByUser: findByUser
};
