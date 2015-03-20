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

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// OAuth configuration
app.oauth = oauth2Server({
    model:  oauthManager,
    grants: ['password'],
    // Access token validity 7 days
    accessTokenLifetime: 60 * 60 * 24 * 7,
    debug: configuration.env !== 'prod'
});

// Routes unlogged
app.route('/hooms').post(controller.Hooms.create);
app.route('/hooms/:slug').get(controller.Hooms.show);
app.route('/users/:id').get(controller.User.show);

// OAuth
app.all('/oauth/access_token', app.oauth.grant());

// OAuth firewall
// app.all('/*', app.oauth.authorise());
// app.all('/*', require('../middleware/loadUser'));

// Routes logged
// app.route('/homepage').post(controller.Homepage.create);

// Default errors handler
app.use(controller.Default.errorHandler);

module.exports = app;
