var Status      = require('../../models/index').Status,
    ObjectId    = require('mongoose').Types.ObjectId;

/**
 * Remove status by ID.
 *
 * @param {string} id
 */
var removeById = function(id) {
    return Status
        .remove({
            _id: new ObjectId(id)
        });
};

/**
 * Remove status by project.
 *
 * @param {string} id
 */
var removeByProject = function(id) {
    return Status
        .remove({
            project: new ObjectId(id)
        });
};

/**
 * Find status by ID.
 *
 * @param {string} id
 */
var findOneById = function(id, select) {
    var query = Status
        .findOne({
            _id: new ObjectId(id)
        });

    if (select) {
        query.select(select);
    }

    return query.exec();
};

/**
 * Find status by ID.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} id
 */
var findOneReadOnlyById = function(id, select) {
    var query = Status
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
 * Find status by UserID.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} userId
 */
var findReadOnlyByUserId = function(userId, select) {
    var query = Status
        .find({ 'owner': new ObjectId(userId) })
        .limit(20)
        .lean()
        .sort('-createdAt');

    if (select) {
        query.select(select);
    }

    return query.exec();
};

/**
 * Find status by ProjectID.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} projectId
 */
var findReadOnlyByProjectId = function(projectId, select) {
    var query = Status
        .find({ 'project': new ObjectId(projectId) })
        .limit(20)
        .lean()
        .sort('-createdAt');

    if (select) {
        query.select(select);
    }

    return query.exec();
};

module.exports = {
    removeById: removeById,
    removeByProject: removeByProject,
    findOneById: findOneById,
    findOneReadOnlyById: findOneReadOnlyById,
    findReadOnlyByUserId: findReadOnlyByUserId,
    findReadOnlyByProjectId: findReadOnlyByProjectId
};