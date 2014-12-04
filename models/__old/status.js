/**
 * Status object model.
 */
module.exports = function(db, conn) {
    var statusSchema = new db.Schema({
        content     : String,
        createdAt   : { type: Date, default: Date.now },
        owner       : { type: db.Schema.Types.ObjectId, ref: 'User' },
        project     : { type: db.Schema.Types.ObjectId, ref: 'Project' }
    });
    return conn.model('Status', statusSchema);
};
