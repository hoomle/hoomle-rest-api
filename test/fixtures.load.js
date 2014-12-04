var MongoClient     = require('mongodb').MongoClient,
    DataFixtures    = require('./fixtures.data'),
    configuration   = require('../config/configuration');

// Connect to the db
MongoClient.connect(configuration.mongodb, function(err, db) {

    if (err) {
        return console.dir(err);
    }

    var collectionUsers = db.collection('users');

    collectionUsers.remove(function(err) {
        collectionUsers.insert(DataFixtures.Users, { w:1 }, function(err, result) {});
    });

});