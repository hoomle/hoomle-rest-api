'use strict';

module.exports = {
    dev: {
        options: {
            reporter: 'spec',
            require: 'tasks/reports/blanket'
        },
        src: ['test/**/*_test.js']
    },
    reports: {
        options: {
            reporter: 'html-cov',
            quiet: true,
            captureFile: 'reports/mocha/coverage.html'
        },
        src: ['test/**/*_test.js']
    },
    'travis-cov': {
        options: {
            reporter: 'travis-cov'
        },
        src: ['test/**/*_test.js']
    }
};
