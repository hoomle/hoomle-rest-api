'use strict';

module.exports = {
    global: {
        internal:               {code:'internal', message: 'internal error'},
        not_found:              {code:'not_found', message: 'content not found'}
    },
    users: {
        missing_filters:        {code: 'users.missing_filters', message: 'you have to specify at least one filter'}
    },
    user: {
        email_already_exist:    {code: 'user.email_already_exist', message: 'an user already exist with this email'},
        username_already_exist: {code: 'user.username_already_exist', message: 'an user already exist with this username'},
        not_found:              {code: 'user.not_found', message: 'user not found'},
        internal:               {code: 'user.internal', message: 'user internal error'}
    },
    string: {
        documentid_invalid:     {code: 'string.document_id_invalid', message: 'the id\'s format is not valid'}
    }
};
