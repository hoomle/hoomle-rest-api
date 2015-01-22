'use strict';

var grunt = require('grunt');

module.exports = {
    reports: {
        jshint: grunt.file.readJSON('.jshintrc'),
        files: {
            'reports/plato': [
                './**/*.js',
                '!./node_modules/**/*.js'
            ]
        }
    }
};
