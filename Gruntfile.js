module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.initConfig({
        concat: {
            'out': {
                'files': {
                    'public/dist/js/aske.js': [
                        'public/js/intro.js',
                        'public/js/modules/*.js',
                        'public/js/outro.js'
                    ]
                }
            }
        },
        uglify: {
            'options': { 'preserveComments': false },
            'out': {
                'files': {
                    'public/dist/js/aske.min.js': [
                        'public/dist/js/aske.js'
                    ]
                }
            }
        },
        less: {
            'options': {
                'compress': true,
                'sourceMap': true,
                'sourceMapURL': 'aske.min.css.map',
                'sourceMapRootpath': '/'
            },
            'out': { 'files': { 'public/dist/css/aske.min.css': ['public/less/base.less'] } }
        },
        karma: {
            'unit': {
                'configFile': 'karma.conf.js',
                'background': true
            }
        },
        watch: {
            'css': {
                'files': ['public/less/**/*'],
                'tasks': ['less']
            },
            'uglify': {
                'files': ['public/js/**/*.js'],
                'tasks': ['concat', 'uglify']
            },
            'karma': {
                'files': [
                    'public/js/**/*.js',
                    'test/**/*.js'
                ],
                'tasks': ['karma:unit:run']
            }
        }
    });
    grunt.registerTask('default', [
        'concat',
        'less',
        'uglify',
        'karma',
        'watch'
    ]);
};