'use strict';

/**
 * User object model.
 */
module.exports = function(db, conn) {
    var userSchema = new db.Schema({
        email       : String,
        password    : String,
        username    : String,
        displayName : String,
        bio         : String,
        location    : String,
        createdAt   : {type: Date, default: Date.now}
    });
    return conn.model('User', userSchema);
};
