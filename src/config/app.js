'use strict';

var express             = require('express'),
    morgan              = require('morgan'),
    bodyParser          = require('body-parser'),
    methodOverride      = require('method-override'),
    oauth2Server        = require('oauth2-server'),
    configuration       = require('./configuration'),
    controller          = require('../controller'),
    oauthManager        = require('../manager/oauth'),
    app                 = express();

app.set('port', configuration.port);
if (configuration.env !== 'test') {
    app.use(morgan(configuration.env));
}
app.use(bodyParser());
app.use(methodOverride());

// OAuth configuration
app.oauth = oauth2Server({
    model:  oauthManager,
    grants: ['password'],
    // Access token validity 7 days
    accessTokenLifetime: 60 * 60 * 24 * 7,
    debug: configuration.env !== 'prod'
});

// OAuth
app.all('/oauth/access_token', app.oauth.grant());

// Routes unlogged
app.route('/homepage/:slug').get(controller.Homepage.show);
app.route('/users/:id').get(controller.User.show);
app.route('/users').post(controller.User.create);

// OAuth firewall
app.all('/*', app.oauth.authorise());
app.all('/*', require('../middleware/loadUser'));

// Routes logged
app.route('/homepage').post(controller.Homepage.create);

// Default errors handler
app.use(controller.Default.errorHandler);

module.exports = app;
