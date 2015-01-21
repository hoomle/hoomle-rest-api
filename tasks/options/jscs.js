'use strict';

// Make sure code styles are up to par and there are no obvious convention mistakes
module.exports = {
    dev: {
        src: [
            './**/*.js',
            '!./node_modules/**/*.js'
        ],
        options: {
            config: '.jscsrc'
        }
    },
    reports: {
        src: [
            './**/*.js',
            '!./node_modules/**/*.js'
        ],
        options: {
            config: '.jscsrc',
            force: true,
            reporter: 'checkstyle',
            reporterOutput: './reports/jscs/jscs-result.xml'
        }
    }
};
