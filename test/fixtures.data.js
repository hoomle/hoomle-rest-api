'use strict';

var userHelper  = require('../src/helper/user'),
    ObjectId    = require('mongoose').Types.ObjectId;

module.exports.Users = [
    // Immutable users
    {
        // 0
        _id             : new ObjectId('5478f34eb576b4a30295d914'),
        email           : 'stanislas.chollet@gmail.com',
        password        : userHelper.generateHash('0000'),
        displayName     : 'Stan Chollet',
        createdAt       : new Date('2014-11-28T22:12:30.182Z')
    }
];

module.exports.Homepage = [
    // Immutable homepage
    {
        // 0
        _id             : new ObjectId('5478f34eb576b4a30295d432'),
        slug            : 'stan',
        bio             : 'Passionnate about travel, software development and sport.',
        location        : 'Paris, France',
        owner           : module.exports.Users[0]._id,
        createdAt       : new Date('2014-11-28T22:12:30.182Z')
    }
];

var expiresIn = new Date();
expiresIn.setSeconds(expiresIn.getSeconds() + (60 * 60 * 24 * 7));
module.exports.AccessToken = [
    // Immutable access token
    {
        // 0
        _id             : new ObjectId('3478f34eb576b4a30295d411'),
        accessToken     : 'd615403c12dc5b8ca2e9c5491278e1508fc5aee0',
        clientId        : 'webapp',
        userId          : module.exports.Users[0]._id,
        expires         : expiresIn
    }
];
