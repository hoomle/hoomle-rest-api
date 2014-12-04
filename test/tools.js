/**
 * Build string to field "Authorization" HTTP Request with username and password
 *
 * @param {string} username
 * @param {string} password
 * @returns {string}
 */
module.exports.buildBasicAuthorization = function(username, password) {
    var hashBase64 = new Buffer(username + ':' + password).toString('base64');
    return 'Basic ' + hashBase64;
};