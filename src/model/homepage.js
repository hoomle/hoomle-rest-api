'use strict';

/**
 * Homepage object model.
 */
module.exports = function(db, conn) {
    var ObjectId = db.Schema.ObjectId;
    var homepageSchema = new db.Schema({
        slug        : String,
        bio         : String,
        owner       : {type: ObjectId, ref: 'User'},
        createdAt   : {type: Date, default: Date.now}
    });
    return conn.model('Homepage', homepageSchema);
};
