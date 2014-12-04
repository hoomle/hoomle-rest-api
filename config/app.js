var morgan              = require('morgan'),
    bodyParser          = require('body-parser'),
    methodOverride      = require('method-override'),
    Configuration       = require('../config/configuration'),
    express             = require('express'),
    passport            = require('passport'),
    controllers         = require('../controllers'),
    app                 = express();

// Configuration
require('../config/passport')(passport);

app.set('port', Configuration.port);
app.use(morgan(Configuration.env));
app.use(bodyParser());
app.use(methodOverride());
app.use(passport.initialize());

// Routes unprotected
// app.route('/users').post(controllers.User.create);

// Enable firewall
// app.use('/', passport.authenticate('basic', { session: false }));

// Routes protected
app.route('/users').get(controllers.User.index);
app.route('/users/:id').get(controllers.User.show);

// Handle error(s)
app.use(controllers.Default.errorHandler);

module.exports = app;