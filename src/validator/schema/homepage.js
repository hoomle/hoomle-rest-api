'use strict';

var joi = require('joi');

var objectSchema = {
    slug:           joi.string().min(3).max(30).required(),
    bio:            joi.string().min(3).max(500),
    location:       joi.string().min(3).max(100)
};

var paramRouteShowSchema = {
    slug:           joi.string().min(3).max(30).required()
};

module.exports = {
    object:         objectSchema,
    paramRouteShow: paramRouteShowSchema
};
