'use strict';

/**
 * Application configuration object
 *
 * @constructor
 */
function Configuration() {
    this.env            = process.env.NODE_ENV || 'dev';
    this.port           = process.env.PORT || 5001;
    this.host           = process.env.HOST || 'localhost';
    this.mongodb        = process.env.MONGODB_PATH || 'mongodb://localhost/hoomle';
    this.uploadAbsPath  = process.env.UPLOAD_PATH || '/tmp/hoomle-api-uploads';
    this.staticAbsPath  = process.env.STATIC_PATH || __dirname + '/../../static';
}

/**
 * Get root URL of application
 */
Configuration.prototype.getRootUrl = function() {
    var url = 'http://' + this.host;
    url += (this.port !== 80) ? ':' + this.port : '';
    return url;
};

module.exports = new Configuration();
