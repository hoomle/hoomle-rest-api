var validator       = require('validator'),
    projectService  = require('../../services/index').Project,
    stringValidator = require('./../string'),
    errors          = require('./../errors'),
    when            = require('when');

var name = function(name) {
    if (name.length <= 2 || name.length > 30) {
        return when.reject(errors.project.name_length);
    }
    return when.resolve(name);
};

var slug = function(slug) {
    if (validator.isNull(slug) || slug.length <= 2 || slug.length > 30) {
        return when.reject(errors.project.slug_bad_length);
    }
    return stringValidator.isSlug(slug);
};

var slugExist = function(slug) {
    return projectService.findOneReadOnlyBySlug(slug)
        .then(function(data) {
            if (data !== null) {
                return when.resolve(slug);
            }
            return when.reject(errors.project.slug_not_found);
        }, function(err) {
            return when.reject(errors.storage.connection_error);
        });
};

var slugNotExist = function(slug) {
    return projectService.findOneReadOnlyBySlug(slug)
        .then(function(data) {
            if (data !== null) {
                return when.reject(errors.project.slug_already_exist);
            }
            return when.resolve(slug);
        }, function(err) {
            return when.reject(errors.storage.connection_error);
        });
};

module.exports = {
    name: name,
    slug: slug,
    slugExist: slugExist,
    slugNotExist: slugNotExist
};