'use strict';

var appServer = require('./config/app');

// Include Gulp and other build automation tools and utilities
// See: https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');

// The default task
gulp.task('default', ['serve']);

// Launch a lightweight HTTP Server
gulp.task('serve', function(cb) {
    var server = appServer.listen(appServer.get('port'), function() {
        console.log("Listening on " + appServer.get('port'));
    });

    var launchServer = function() {
        server.close();
        server = appServer.listen(appServer.get('port'), function() {
            console.log("Listening on " + appServer.get('port'));
        });
    };

    gulp.watch([
            'adapter/*.js',
            'cli/*.js',
            'config/*.js',
            'controllers/*.js',
            'helpers/*.js',
            'models/*.js',
            'services/*.js',
            'validator/*.js',
            'app.js'
        ],
        launchServer
    );
    cb();
});
