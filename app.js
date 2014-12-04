/*
 *  _                    _                             _
 * | |__    ___    ___  | |  ___          __ _  _ __  (_)
 * | '_ \  / _ \  / _ \ | | / _ \ _____  / _` || '_ \ | |
 * | | | || (_) || (_) || ||  __/|_____|| (_| || |_) || |
 * |_| |_| \___/  \___/ |_| \___|        \__,_|| .__/ |_|
 *
 */

var console     = require('console'),
    app         = require('./config/app');

app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port'));
});