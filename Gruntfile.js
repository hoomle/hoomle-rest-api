'use strict';

var fs = require('fs');

function loadConfig(path) {
    var files = fs.readdirSync(path);
    var obj   = {};
    var key;

    files.forEach(function(file) {
        if (/\.conf\.js$/.test(file)) {
            return;
        }
        key      = file.replace(/\.js$/,'');
        obj[key] = require(path + file);
    });

    return obj;
}

module.exports = function(grunt) {
    var config = {
        env : process.env
    };
    grunt.util._.extend(config, loadConfig(__dirname + '/tasks/options/'));

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.loadTasks('tasks');
    grunt.config.init(config);
};
