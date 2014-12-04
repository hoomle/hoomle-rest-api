var validator   = require('validator'),
    errors      = require('./errors'),
    when        = require('when');

var isNotNull = function(value) {
    if (validator.isNull(value)) {
        return when.reject(errors.string.not_null);
    }
    return when.resolve(value);
};

var isEmail = function(mail) {
    if (mail !== null && mail.length > 0 && !validator.isEmail(mail)) {
        return when.reject(errors.string.email_bad_format);
    }
    return when.resolve(mail);
};

var isSlug = function(slug) {
    if (slug !== null && slug.length > 0 && !slug.match(/^[a-z0-9-_]+$/)) {
        return when.reject(errors.string.slug_bad_format);
    }
    return when.resolve(slug);
};

var isDocumentId = function(str) {
    if (!/^[0-9a-fA-F]{24}$/.test(str)) {
        return when.reject(errors.string.documentid_bad_format);
    }
    return when.resolve(str);
};

module.exports = {
    isNotNull: isNotNull,
    isEmail: isEmail,
    isSlug: isSlug,
    isDocumentId: isDocumentId
};