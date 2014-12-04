var BasicStrategy   = require('passport-http').BasicStrategy,
    User            = require('../models').User,
    userHelper      = require('../helpers/user');

module.exports = function(passport) {

    /**
     *
     * @param {string}   username
     * @param {string}   password
     * @param {function} done
     */
    var callBackBasicStrategy = function(username, password, done) {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  username }, function(err, user) {

            // if there are any errors, return the error before anything else
            if (err) {
                return done(err);
            }

            // if no user is found, return the message
            if (!user) {
                return done(null, false);
            }

            // if the user is found but the password is wrong
            if (!userHelper.comparePassword(password, user.password)) {
                return done(null, false);
            }

            return done(null, user);
        });
    };

    passport.use(new BasicStrategy({}, callBackBasicStrategy));
};