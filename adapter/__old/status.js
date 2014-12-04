var configuration   = require('../../config/configuration'),
    arrayHelper     = require('../../helpers/array'),
    _               = require('lodash');

/**
 * Add 'links' data to entity to respect the HATEOAS guidelines
 *
 * @param {Status} status
 */
var hateoasize = function(types, status) {
    if (_.contains(types, 'self')) {
        arrayHelper.pushToPropertyUnknow(status, 'links', {
            'rel'   : 'self',
            'href'  : configuration.getRootUrl() + '/status/' + status._id,
            'method': 'GET'
        });
    }
    return status;
};

module.exports.hateoasize = hateoasize;