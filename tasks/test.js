'use strict';

// Usage : grunt test           // Default tests
//         grunt test:dev       // Dev tests (including coverage reports)
//         grunt test:ci        // Jenkins tests

module.exports = function(grunt) {
    grunt.registerTask('test', 'Run tests', function() {
        var type = this.args[0] || 'dev';
        grunt.task.run([
            'mochaTest:' + type
        ]);
    });
};
