/**
 * Project object model.
 */
module.exports = function(db, conn) {
    var projectSchema = new db.Schema({
        name        : String,
        slug        : String,
        owner       : { type: db.Schema.Types.ObjectId, ref: 'User' },
        users       : [{ type: db.Schema.Types.ObjectId, ref: 'User' }],
        createdAt   : { type: Date, default: Date.now },
        updatedAt   : { type: Date, default: Date.now }
    });
    return conn.model('Project', projectSchema);
};
