'use strict';

var grunt = require('grunt');

module.exports = {
    reports: {
        jshint: grunt.file.readJSON('.jshintrc'),
        files: {
            'reports/plato': [
                'Gruntfile.js',
                'grunt-tasks/**/*.js',
                './**/*.js',
                '!./node_modules/**/*.js'
            ]
        }
    }
};
