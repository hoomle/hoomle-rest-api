'use strict';

module.exports = function(grunt) {
    grunt.registerTask('reports', 'Generates test and coverage reports (add :full to generate HTML)', function() {
        var isFull = (this.args[0] === 'full');

        if (isFull) {
            grunt.task.run([
                'clean:reports',
                'jshint:reports',
                'jscs:reports',
                'jscpd:reports',
                'mochaTest',
                'plato:reports'
            ]);
            return;
        }

        grunt.task.run([
            'clean:reports',
            'jshint:reports',
            'jscs:reports',
            'mochaTest'
        ]);
    });
};
