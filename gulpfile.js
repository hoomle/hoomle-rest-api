'use strict';

var appServer   = require('./config/app'),
    gulp        = require('gulp'),
    mocha       = require('gulp-mocha'),
    jshint      = require('gulp-jshint'),
    jscs        = require('gulp-jscs-custom'),
    clean       = require('gulp-clean'),
    runSequence = require('run-sequence');

// The default task
gulp.task('default', ['serve']);

// Launch a lightweight HTTP Server
gulp.task('serve', function(callback) {
    var server = appServer.listen(appServer.get('port'), function() {
        console.log('Listening on ' + appServer.get('port'));
    });

    var launchServer = function() {
        server.close();
        server = appServer.listen(appServer.get('port'), function() {
            console.log('Listening on ' + appServer.get('port'));
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
    callback();
});

gulp.task('reports-clean', function() {
    return gulp
        .src('reports/**/*', {read: false})
        .pipe(clean());
});

gulp.task('jshint', function() {
    return gulp
        .src([
            './**/*.js',
            '!./node_modules/**/*.js'
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function() {
    return gulp
        .src([
            './**/*.js',
            '!./node_modules/**/*.js'
        ])
        .pipe(jscs({
            esnext:     false,
            configPath: '.jscsrc',
            reporter:   'checkstyle',
            filePath:   'reports/jscs.xml'
        }));
});

gulp.task('reports', function() {
    runSequence(
        'reports-clean',
        ['jshint', 'jscs']
    );
});

gulp.task('tests', function() {
    console.log('start');
    return gulp
        .src('test/**/*_test.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});
