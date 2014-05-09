'use strict';
module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // theme location 
        //theme_location: 'wp-content/themes/wb/',

        // watch for changes and trigger compass, jshint, uglify and livereload
        watch: {
            sass: {
                files: ['_/scss/**/*.scss'],
                tasks: ['compass']
            },
            js: {
                files: ['_/js/source/**/*.js' , '_/js/vendor/**/*.js'],
                tasks: ['jshint' , 'uglify']
            },
            livereload: {
                options: { livereload: true },
                files: ['*.html' , '*.php' , '_/css/main.css' , '_/js/script.js' , '_/img/**/*.{png,jpg,jpeg,gif,webp,svg}']
            },
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        }, // watch

        // compass and scss
        compass: {
            dev: {
                options: {
                    config: 'config.rb',
                    force: true
                }
            }
        }, // compass

        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'Gruntfile.js',
                '_/js/source/**/*.js',
                '_/js/vendor/**/*.js'
            ]
        },

        // uglify to concat, minify, and make source maps
        uglify: {
            plugins: {
                options: {
                    sourceMap: '_/js/plugins.js.map',
                    sourceMappingURL: 'plugins.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    '_/js/plugins.min.js': [
                        '_/js/source/plugins.js'
                        // 'assets/js/vendor/yourplugin/yourplugin.js',
                    ]
                }
            },
            main: {
                options: {
                    sourceMap: '_/js/script.js.map',
                    sourceMappingURL: 'script.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    '_/js/script.min.js': [
                        '_/js/source/script.js',
                        '_/js/vendor/**/*.js'
                    ]
                }
            }
        }, // uglify

        // image optimization
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: '_/img/', 
                    src: '**/*',
                    dest: '_/img/'
                }]
            }
        }, // imagemin

        // deploy via rsync
        deploy: {
            options: {
                src: "./",
                args: ["--verbose"],
                exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'config.rb', '.jshintrc'],
                recursive: true,
                syncDestIgnoreExcl: true
            },
            staging: {
                options: {
                    dest: "~/path/to/theme",
                    host: "user@host.com"
                }
            },
            production: {
                options: {
                    dest: "~/path/to/theme",
                    host: "user@host.com"
                }
            }
        } // deploy

    }); // initConfig

    // rename tasks
    grunt.renameTask('rsync', 'deploy');

    // register task
    grunt.registerTask('default' , 'watch');

}; // exports
