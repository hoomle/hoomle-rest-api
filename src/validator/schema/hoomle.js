'use strict';

var joi = require('joi');

var creationSchema = {
    email:          joi.string().email().required(),
    password:       joi.string().min(3).max(20).required(),
    displayName:    joi.string().min(3).max(30).required(),
    slug:           joi.string().min(3).max(30).required()
};

module.exports = {
    creation: creationSchema
};
