var configuration   = require('../../config/configuration'),
    arrayHelper     = require('../../helpers/array'),
    _               = require('lodash');

/**
 * Add 'links' data to entity to respect the HATEOAS guidelines
 *
 * @param {Project} project
 */
var hateoasize = function(types, project) {
    if (_.contains(types, 'self')) {
        arrayHelper.pushToPropertyUnknow(project, 'links', {
            'rel'   : 'self',
            'href'  : configuration.getRootUrl() + '/project/' + project._id,
            'method': 'GET'
        });
    }
    if (_.contains(types, 'create')) {
        arrayHelper.pushToPropertyUnknow(project, 'links', {
            'rel'   : 'create',
            'href'  : configuration.getRootUrl() + '/project',
            'method': 'POST'
        });
    }
    if (_.contains(types, 'update')) {
        arrayHelper.pushToPropertyUnknow(project, 'links', {
            'rel'   : 'update',
            'href'  : configuration.getRootUrl() + '/project/' + project._id,
            'method': 'PUT'
        });
    }
    if (_.contains(types, 'users')) {
        arrayHelper.pushToPropertyUnknow(project, 'links', {
            'rel'   : 'users',
            'href'  : configuration.getRootUrl() + '/project/' + project._id + '/users',
            'method': 'GET'
        });
    }
    if (_.contains(types, 'status')) {
        arrayHelper.pushToPropertyUnknow(project, 'links', {
            'rel'   : 'status',
            'href'  : configuration.getRootUrl() + '/project/' + project._id + '/status',
            'method': 'GET'
        });
    }
    return project;
};

module.exports.hateoasize = hateoasize;
