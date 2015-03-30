'use strict';

var joi = require('joi');

var profileSchema = {
    name: joi.string().min(3).max(150),
    size: joi.number().integer()
};

module.exports = {
    profile: profileSchema
};