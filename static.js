'use strict';

/*
 *  _                    _                             _
 * | |__    ___    ___  | |  ___          __ _  _ __  (_)
 * | '_ \  / _ \  / _ \ | | / _ \ _____  / _` || '_ \ | |
 * | | | || (_) || (_) || ||  __/|_____|| (_| || |_) || |
 * |_| |_| \___/  \___/ |_| \___|        \__,_|| .__/ |_|
 *
 */

var express             = require('express'),
    configuration       = require('./src/config/configuration'),
    port                = process.env.PORT || 5002,
    app                 = express();

app.set('port', port);
app.use(express.static(configuration.staticAbsPath));

app.listen(app.get('port'), function() {
    console.log('Listening on ' + app.get('port'));
});
