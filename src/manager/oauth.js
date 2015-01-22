'use strict';

var userDao         = require('./dao/user'),
    userHelper      = require('../helper/user'),
    AccessToken     = require('../model/index').AccessToken,
    model           = module.exports;

/**
 * Check if the token exist into the storage
 *
 * @param bearerToken
 * @param callback
 */
model.getAccessToken = function(bearerToken, callback) {
    AccessToken.findOne({accessToken: bearerToken}, callback);
};

/**
 * Identify the client with its ID and its secret
 *
 * This feature is "hard coded" because at the moment we don't provide a way to register apps (client)
 *
 * @param {String} clientId
 * @param {String} clientSecret
 * @param callback
 */
model.getClient = function(clientId, clientSecret, callback) {
    callback(null, {
        clientId: 'webapp',
        clientSecret: 'secret',
        redirectUri: ''
    });
};

/**
 * Authorize only some grant type for a specific client
 *
 * Currently, we allow all grant type for all client
 *
 * @param {String} clientId
 * @param {String} grantType
 * @param callback
 */
model.grantTypeAllowed = function(clientId, grantType, callback) {
    callback(false, true);
};

/**
 * Save the token to persist the authentication of a user
 *
 * @param {String} token
 * @param {String} clientId
 * @param expires
 * @param {String} userId
 * @param callback
 */
model.saveAccessToken = function(token, clientId, expires, userId, callback) {
    var accessToken = new AccessToken({
        accessToken: token,
        clientId: clientId,
        userId: userId,
        expires: expires
    });

    accessToken.save(callback);
};

/**
 * Authenticate the user with the application with the grant type "password"
 *
 * @param {String} username
 * @param {String} password
 * @param callback
 */
model.getUser = function(username, password, callback) {
    userDao
        .findOneReadOnlyByEmail(username)
        .then(function(user) {
            if (user !== null && userHelper.comparePassword(password, user.password)) {
                callback(null, user);
            } else {
                callback(null, null);
            }
        }, function(err) {
            callback(err);
        });
};

/**
 * Support of the grant type "refresh_token"
 *
 * /!\ This feature is not implemented
 *
 * @param token
 * @param clientId
 * @param expires
 * @param userId
 * @param callback
 */
model.saveRefreshToken = function(token, clientId, expires, userId, callback) {
    callback(null);
};

/**
 * Retrieve a refresh token
 *
 * /!\ This feature is not implemented
 *
 * @param refreshToken
 * @param callback
 */
model.getRefreshToken = function(refreshToken, callback) {
    callback(null);
};
