var _ = require('lodash');

var isErrorObject = function(obj) {
    return _.isObject(obj) && _.has(obj, 'message') && _.has(obj, 'code');
};

module.exports = {
    BadRequest: function(msg, code) {
        if (isErrorObject(msg)) {
            this.code = msg.code;
            this.message = msg.message;
        } else {
            if (code !== undefined && code !== null) {
                this.code = code;
            }
            this.message = msg || 'Bad request';
        }
        this.status = 400;
    },
    Unauthorized: function(msg, code) {
        if (isErrorObject(msg)) {
            this.code = msg.code;
            this.message = msg.message;
        } else {
            if (code !== undefined && code !== null) {
                this.code = code;
            }
            this.message = msg || 'Unauthorized';
        }
        this.status = 401;
    },
    Forbidden: function(msg, code) {
        if (isErrorObject(msg)) {
            this.code = msg.code;
            this.message = msg.message;
        } else {
            if (code !== undefined && code !== null) {
                this.code = code;
            }
            this.message = msg || 'Forbidden';
        }
        this.status = 403;
    },
    NotFound: function(msg, code) {
        if (isErrorObject(msg)) {
            this.code = msg.code;
            this.message = msg.message;
        } else {
            if (code !== undefined && code !== null) {
                this.code = code;
            }
            this.message = msg || 'Not found';
        }
        this.status = 404;
    }
};