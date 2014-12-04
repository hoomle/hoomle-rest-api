var configuration   = require('../config/configuration'),
    arrayHelper     = require('../helpers/array'),
    _               = require('lodash');

/**
 * Add 'links' data to entity to respect the HATEOAS guidelines
 *
 * @param {array} types
 */
var hateoasize = function(types, user) {
    if (_.contains(types, 'self')) {
        arrayHelper.pushToPropertyUnknow(user, 'links', {
            'rel'   : 'self',
            'href'  : configuration.getRootUrl() + '/users/' + user._id,
            'method': 'GET'
        });
    }
    if (_.contains(types, 'status')) {
        arrayHelper.pushToPropertyUnknow(user, 'links', {
            'rel'   : 'status',
            'href'  : configuration.getRootUrl() + '/users/' + user._id + '/status',
            'method': 'GET'
        });
    }
    return user;
};

module.exports.hateoasize = hateoasize;