'use strict';

module.exports = {
    unknow:                           {code: '0',   message: 'Unknow error'},
    users: {
        missing_filters:              {code: 'U-1', message: 'you have to specify at least one filter'}
    },
    user: {
        password_confirmation_fail:   {code: 'U-2', message: 'both password are not the same'},
        password_length_too_short:    {code: 'U-3', message: 'the password\'s length is too short (3 min caracters)'},
        password_length_too_long:     {code: 'U-4', message: 'the password\'s length is too long (15 caracters max)'},
        email_not_found:              {code: 'U-5', message: 'this email is not registered'},
        email_already_exist:          {code: 'U-6', message: 'this email is already registered'},
        not_found:                    {code: 'U-7', message: 'user not found'}
    },
    string: {
        not_null:                     {code: 'str-1', message: 'the string must be not null'},
        email_bad_format:             {code: 'str-2', message: 'the email\'s format is not valid'},
        slug_bad_format:              {code: 'str-3', message: 'the slug\'s format is not valid'},
        documentid_bad_format:        {code: 'str-4', message: 'the id\'s format is not valid'}
    },
    storage: {
        connection_error:             {code: 'store-1', message: 'Error durring connection with mongo'}
    }
};
