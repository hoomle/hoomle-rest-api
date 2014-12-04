/**
 * Application configuration object
 *
 * @constructor
 */
function Configuration() {
    this.env        = process.env.NODE_ENV || 'dev';
    this.port       = process.env.PORT || 5001;
    this.host       = process.env.HOOLE_API_HOST || "localhost";
    this.mongodb    = process.env.HOOLE_API_MONGODB_PATH || 'mongodb://localhost/hoole';
}

/**
 * Get root URL of application
 */
Configuration.prototype.getRootUrl = function() {
    var url = 'http://' + this.host;
    url += (80 !== this.port) ? ':' + this.port : '';
    return url;
};

module.exports = new Configuration();