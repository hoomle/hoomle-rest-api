'use strict';

var MongoClient     = require('mongodb').MongoClient,
    DataFixtures    = require('./fixtures.data'),
    configuration   = require('../config/configuration');

// Connect to the db
MongoClient.connect(configuration.mongodb, function(err, db) {
    if (err) {
        return console.dir(err);
    }

    var collectionUsers = db.collection('users');
    collectionUsers.remove(function() {
        collectionUsers.insert(DataFixtures.Users, {w:1}, function() {});
    });

    var collectionHomepages = db.collection('homepages');
    collectionHomepages.remove(function() {
        collectionHomepages.insert(DataFixtures.Homepage, {w:1}, function() {});
    });
});
