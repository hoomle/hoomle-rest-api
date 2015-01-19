'use strict';

var express             = require('express'),
    morgan              = require('morgan'),
    bodyParser          = require('body-parser'),
    methodOverride      = require('method-override'),
    oauth2Server        = require('oauth2-server'),
    Configuration       = require('../config/configuration'),
    controllers         = require('../controllers'),
    oauthManager        = require('../manager/oauth'),
    app                 = express();

app.set('port', Configuration.port);
app.use(morgan(Configuration.env));
app.use(bodyParser());
app.use(methodOverride());

// OAuth configuration
app.oauth = oauth2Server({
    model:  oauthManager,
    grants: ['password'],
    debug:  true
});

// OAuth
app.all('/oauth/access_token', app.oauth.grant());

// Routes unlogged
app.route('/homepage/:slug').get(controllers.Homepage.show);
app.route('/users/:id').get(controllers.User.show);
app.route('/users').post(controllers.User.create);

// OAuth firewall
app.all('/*', app.oauth.authorise());
app.all('/*', require('../middlewares/loadUser'));

// Routes logged
app.route('/homepage').post(controllers.Homepage.create);

// Default errors handler
app.use(controllers.Default.errorHandler);

module.exports = app;
