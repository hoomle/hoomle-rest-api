'use strict';

// Make sure code styles are up to par and there are no obvious mistakes
module.exports = {
    dev: {
        options: {
          jshintrc: true,
          reporter: require('jshint-stylish')
        },
        src: [
            './**/*.js',
            '!./node_modules/**/*.js'
        ]
    },
    reports: {
        options: {
            jshintrc: true,
            force: true,
            reporter: 'checkstyle',
            reporterOutput: './reports/jshint/jshint-result.xml'
        },
        src: [
            './**/*.js',
            '!./node_modules/**/*.js'
        ]
    }
};
