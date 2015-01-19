'use strict';

/**
 * AccessToken object model.
 */
module.exports = function(db, conn) {
    var ObjectId = db.Schema.ObjectId;
    var accessTokenSchema = new db.Schema({
        accessToken: {type: String},
        clientId: {type: String},
        userId: {type: ObjectId, ref: 'User'},
        expires: {type: Date}
    });
    return conn.model('AccessToken', accessTokenSchema);
};
