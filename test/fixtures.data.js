'use strict';

var userHelper  = require('../helpers/user'),
    ObjectId    = require('mongoose').Types.ObjectId;

module.exports.Users = [
    // Immutable users
    {
        // 0
        _id             : new ObjectId('5478f34eb576b4a30295d914'),
        email           : 'stanislas.chollet@gmail.com',
        password        : userHelper.generateHash('stanislas.chollet@gmail.com'),
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
