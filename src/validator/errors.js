'use strict';

/* jshint ignore:start */
module.exports = {
    global: {
        internal:               {code:'internal', message: 'internal error'},
        forbidden:              {code:'forbidden', message: 'access denied'},
        not_found:              {code:'not_found', message: 'content not found'}
    },
    users: {
        missing_filters:        {code: 'users.missing_filters', message: 'you have to specify at least one filter'}
    },
    user: {
        email_already_exist:    {code: 'user.email_already_exist', message: 'an user already exist with this email'},
        username_already_exist: {code: 'user.username_already_exist', message: 'user already exist with this username'},
        not_found:              {code: 'user.not_found', message: 'user not found'},
        internal:               {code: 'user.internal', message: 'user internal error'}
    },
    string: {
        documentid_invalid:     {code: 'string.document_id_invalid', message: 'the id\'s format is not valid'}
    },
    homepage: {
        slug_already_exist:     {code: 'homepage.slug_already_exist', message: 'homepage already exist with this slug'},
        owner_not_exist:        {code: 'homepage.owner_not_exist', message: 'the owner does not exist'},
        not_found:              {code: 'homepage.not_found', message: 'homepage not found'},
        internal:               {code: 'homepage.internal', message: 'homepage internal error'}
    },
    hooms: {
        not_found:              {code: 'hooms.not_found', message: 'hooms not found'},
        internal:               {code: 'hooms.internal', message: 'hooms internal error'},
        not_owner:              {code: 'hooms.not_owner', message: 'You are not the owner of this hooms'}
    },
    file: {
        photo: {
            invalid_format: {code: 'photo.invalid_format', message: 'The image format provided is not supported'},
            image_size_too_small: {code: 'photo.image_size_too_small', message: 'The image size is too small.'},
            image_size_too_big: {code: 'photo.image_size_too_big', message: 'The image size is too big.'},
            size_too_big: {code: 'photo.size_too_big', message: 'The file is too large.'}
        }
    }
};
/* jshint ignore:end */
