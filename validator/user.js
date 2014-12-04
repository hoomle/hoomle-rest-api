var validator       = require('validator'),
    userService     = require('../services').User,
    stringValidator = require('./string'),
    errors          = require('./errors'),
    when            = require('when'),
    sequence        = require('when/sequence');

var email = function(email) {
    return sequence([
            stringValidator.isNotNull,
            stringValidator.isEmail
        ], email);
};

var password = function(password) {
    if (password.length < 3) {
        return when.reject(errors.user.password_length_too_short);
    }
    if (password.length > 15) {
        return when.reject(errors.user.password_length_too_long);
    }
    return when.resolve(password);
};

var emailExist = function(mail) {
    return userService.findOneReadOnlyByEmail(mail)
        .then(function(data) {
            if (data !== null) {
                return when.resolve(mail);
            }
            return when.reject(errors.user.email_not_found);
        }, function(err) {
            return when.reject(errors.storage.connection_error);
        });
};

var emailNotExist = function(mail) {
    return userService.findOneReadOnlyByEmail(mail)
        .then(function(data) {
            if (data !== null) {
                return when.reject(errors.user.email_already_exist);
            }
            return when.resolve(mail);
        }, function(err) {
            return when.reject(errors.storage.connection_error);
        });
};

var samePassword = function(password, confirmPassword) {
    if (password !== confirmPassword) {
        return when.reject(errors.user.password_confirmation_fail);
    }
    return when.resolve(password);
};

module.exports = {
    email: email,
    password: password,
    emailExist: emailExist,
    emailNotExist: emailNotExist,
    samePassword: samePassword
};