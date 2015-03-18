'use strict';

var joi = require('joi');

var objectSchema = {
    email:          joi.string().email().required(),
    password:       joi.string().min(3).max(20).required(),
    displayName:    joi.string().min(3).max(30).required()
};

var paramRouteShowSchema = {
    id:             joi.string().regex(/^[0-9a-fA-F]{24}$/)
};

module.exports = {
    object:         objectSchema,
    paramRouteShow: paramRouteShowSchema
};
