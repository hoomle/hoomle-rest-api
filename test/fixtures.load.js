'use strict';

var MongoClient     = require('mongodb').MongoClient,
    DataFixtures    = require('./fixtures.data'),
    configuration   = require('../src/config/configuration');

function load(callback) {
    // Connect to the db
    MongoClient.connect(configuration.mongodb, function(err, db) {
        if (err) {
            return console.dir(err);
        }

        var collectionUsers = db.collection('users');
        var collectionHomepages = db.collection('homepages');
        var collectionAccessTokens = db.collection('accesstokens');

        // TODO Promisify this callback hell
        // Remove users
        collectionUsers.remove(function() {
            // Insert users
            collectionUsers.insert(DataFixtures.Users, {w:1}, function() {
                // Remove homepages
                collectionHomepages.remove(function() {
                    // Insert homepages
                    collectionHomepages.insert(DataFixtures.Homepage, {w:1}, function() {
                        // Remove tokens
                        collectionAccessTokens.remove(function() {
                            // Insert tokens
                            collectionAccessTokens.insert(DataFixtures.AccessToken, {w:1}, function() {
                                callback();
                            });
                        });
                    });
                });
            });
        });
    });
}

module.exports = load;
