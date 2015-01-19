'use strict';

var joi = require('joi');

var defaultSchema = {
    slug:           joi.string().min(3).max(30).required(),
    bio:            joi.string().min(3).max(500),
    location:       joi.string().min(3).max(100)
};

module.exports = {
    default: defaultSchema
};
