'use strict';

var ObjectId    = require('mongoose').Types.ObjectId,
    Homepage    = require('../../model/index').Homepage;

/**
 * Find homepage by ID.
 * The data return are a MongooseDocument
 *
 * @param {string} id
 * @return {MongooseDocument}
 */
var findOneById = function(id, select) {
    var query = Homepage
        .findOne({
            _id: new ObjectId(id)
        });

    if (select) {
        query.select(select);
    }

    return query.exec();
};

/**
 * Find homepage by ID.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} id
 */
var findOneReadOnlyById = function(id, select) {
    var query = Homepage
        .findOne({
            _id: new ObjectId(id)
        })
        .lean(true);

    if (select) {
        query.select(select);
    }

    return query.exec();
};

/**
 * Find homepage by list of IDs.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {array} ids
 */
var findReadOnlyByIds = function(ids, select) {
    var query = Homepage
        .find({})
        .where('_id').in(ids)
        .lean(true);

    if (select) {
        query.select(select);
    }

    return query.exec();
};

/**
 * Find homepage by slug.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} slug
 */
var findOneReadOnlyBySlug = function(slug, select) {
    var query = Homepage
        .findOne({
            slug: slug
        })
        .lean(true);

    if (select) {
        query.select(select);
    }

    return query.exec();
};

/**
 * Find homepage by its slug and owner.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} slug
 * @param {string} userId
 * @return {Object}
 */
var findOneReadOnlyBySlugAndUser = function(slug, userId, select) {
    var query = Homepage
        .findOne({
            slug: slug,
            owner: new ObjectId(userId)
        })
        .lean(true);

    if (select) {
        query.select(select);
    }

    return query.exec();
};

/**
 * Find homepage by its slug and owner.
 *
 * @param {string} slug
 * @param {string} userId
 * @return {MongooseDocument}
 */
var findOneBySlugAndUser = function(slug, userId, select) {
    var query = Homepage
        .findOne({
            slug: slug,
            owner: new ObjectId(userId)
        });

    if (select) {
        query.select(select);
    }

    return query.exec();
};

/**
 * Find homepages by owner.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} userId
 * @return {Array}
 */
var findReadOnlyByUser = function(userId, select) {
    var query = Homepage
        .find({
            owner: new ObjectId(userId)
        })
        .lean(true);

    if (select) {
        query.select(select);
    }

    return query.exec();
};

module.exports = {
    findOneById: findOneById,
    findOneReadOnlyById: findOneReadOnlyById,
    findReadOnlyByIds: findReadOnlyByIds,
    findOneReadOnlyBySlug: findOneReadOnlyBySlug,
    findOneReadOnlyBySlugAndUser: findOneReadOnlyBySlugAndUser,
    findOneBySlugAndUser: findOneBySlugAndUser,
    findReadOnlyByUser: findReadOnlyByUser
};
