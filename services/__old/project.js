var Project     = require('../../models/index').Project,
    ObjectId    = require('mongoose').Types.ObjectId;

/**
 * Remove project by ID.
 *
 * @param {string} id
 */
var removeById = function(id) {
    return Project
        .remove({
            _id: new ObjectId(id)
        });
};

/**
 * Find project by ID.
 * The data return is a MongooseDocument
 *
 * @param {string} id
 * @return {MongooseDocument}
 */
var findOneById = function(id, select) {
    var query = Project
        .findOne({
            _id: new ObjectId(id)
        });

    if (select) {
        query.select(select);
    }

    return query.exec();
};

/**
 * Find project by ID.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} id
 */
var findOneReadOnlyById = function(id, select) {
    var query = Project
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
 * Find project by Slug.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} slug
 */
var findOneReadOnlyBySlug = function(slug, select) {
    var query = Project
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
 * Find projects by user.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} userId
 * @param {string} select (Optional)
 */
var findReadOnlyByUser = function(userId, select) {
    var query = Project
        .find({})
        .where('users').in([new ObjectId(userId)])
        .lean(true)
        .sort('-updatedAt');

    if (select) {
        query.select(select);
    }

    return query.exec();
};

module.exports = {
    removeById: removeById,
    findOneById: findOneById,
    findOneReadOnlyById: findOneReadOnlyById,
    findOneReadOnlyBySlug: findOneReadOnlyBySlug,
    findReadOnlyByUser: findReadOnlyByUser
};