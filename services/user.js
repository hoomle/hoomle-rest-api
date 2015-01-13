'use strict';

var User            = require('../models').User,
    ObjectId        = require('mongoose').Types.ObjectId;

/**
 * Find user by ID.
 * The data return are a MongooseDocument
 *
 * @param {string} id
 * @return {MongooseDocument}
 */
var findOneById = function(id, select) {
    var query = User
        .findOne({
            _id: new ObjectId(id)
        });

    if (select) {
        query.select(select);
    }

    return query.exec();
};

/**
 * Find user by ID.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} id
 */
var findOneReadOnlyById = function(id, select) {
    var query = User
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
 * Find user by list of IDs.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {array} ids
 */
var findReadOnlyByIds = function(ids, select) {
    var query = User
        .find({})
        .where('_id').in(ids)
        .lean(true)
        .sort('email');

    if (select) {
        query.select(select);
    }

    return query.exec();
};

/**
 * Find user by email.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} email
 */
var findOneReadOnlyByEmail = function(email, select) {
    var query = User
        .findOne({
            email: email
        })
        .lean(true);

    if (select) {
        query.select(select);
    }

    return query.exec();
};

/**
 * Find user by username.
 * The data return are Read Only (Plain Objet) instead of MongooseDocument
 *
 * @param {string} username
 */
var findOneReadOnlyByUsername = function(username, select) {
    var query = User
        .findOne({
            username: username
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
    findOneReadOnlyByEmail: findOneReadOnlyByEmail,
    findOneReadOnlyByUsername: findOneReadOnlyByUsername
};
