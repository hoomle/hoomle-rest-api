'use strict';

var joi = require('joi');

var defaultSchema = {
    email:          joi.string().email().required(),
    password:       joi.string().min(3).max(20).required(),
    username:       joi.string().alphanum().min(3).max(30).required(),
    displayName:    joi.string().min(3).max(30).required(),
    bio:            joi.string(),
    location:       joi.string()
};

module.exports = {
    default: defaultSchema
};
