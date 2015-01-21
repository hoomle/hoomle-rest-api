'use strict';

module.exports = function(grunt) {
    grunt.registerTask('check', 'Validate files and coding styles', function() {
        var type = (this.args[0] || 'dev');
        grunt.task.run([
            'jshint:' + type,
            'jscs:' + type
        ]);
    });
};
