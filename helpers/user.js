var bcrypt = require('bcrypt-nodejs');

/**
 * Generating a hash
 *
 * @param {string} password
 * @returns {string}
 */
var generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Checking if password is valid
 *
 * @param {string} password
 * @returns {boolean}
 */
var comparePassword = function(password, passwordHashed) {
    return bcrypt.compareSync(password, passwordHashed);
};

module.exports = {
    generateHash: generateHash,
    comparePassword: comparePassword
};