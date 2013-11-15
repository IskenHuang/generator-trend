'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist',
        bower: 'bower_components',
        test: 'test'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            coffee: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            // compass: {
            //     files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
            //     tasks: ['compass']
            // },
            less: {
                files: ['<%= yeoman.app %>/styles/{,*}/*.{less,css}'],
                tasks: ['less']
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                // default is 'localhost'
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'app'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'app'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'dist')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            },
            serverTest: {
                path: 'http://localhost:<%= connect.options.port %>/test.html'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp',
            distScript: '<%= yeoman.dist %>/scripts',
            test: '.grunt'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/fonts',
                importPath: 'app/<%= yeoman.bower %>',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        less: {
            compile: {
                files: {
                    '.tmp/styles/main.css': ['<%= yeoman.app %>/styles/main.less']
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    // `name` and `out` is set by grunt-usemin
                    baseUrl: '.tmp/scripts',
                    optimize: 'none',
                    paths: {
                        //Comment out this line to go back to loading
                        //the non-optimized main.js source file.
                        'main': 'main'
                    },
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true,
                    name: 'main',
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                options:{
                    optimizationLevel: 3,
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'fonts/*'
                    ]
                }]
            },
            testBuild: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess'
                    ]
                }]
            },
            prepareRequirejs: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '.tmp',
                    src: [
                        '<%= yeoman.bower %>/requirejs/require.js',
                        '<%= yeoman.bower %>/jquery/jquery.js',
                        '<%= yeoman.bower %>/underscore/underscore.js',
                        '<%= yeoman.bower %>/backbone/backbone.js',
                        'scripts/{,*/}*.js'
                    ]
                }]
            },
            trendFont: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>/bower_components/trend-branding-styleguide/fonts/',
                    dest: '<%= yeoman.app %>/fonts',
                    src: [
                        '**'
                    ]
                }]
            },
            trendImages: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>/bower_components/trend-branding-styleguide/img/',
                    dest: '<%= yeoman.app %>/img/trend/',
                    src: [
                        '**'
                    ]
                }]
            }
        },
        bower: {
            options: {
                exclude: ['modernizr']
            },
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/main.js'
            }
        },
        shell: {
            createDist: {
                command: 'mkdir dist',
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            linkComponenets: {
                command: 'ln -s ../app/<%= yeoman.bower %> ./dist',
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            copyDotGrunt: {
                command: 'cp -r .grunt test',
                options: {
                    stdout: true,
                    stderr: true
                }
            }
        },
        plato: {
            src: {
                files: {
                    'plato': [
                        'app/scripts/views/*.js',
                        'app/scripts/models/*.js',
                        'app/scripts/collection/*.js',
                        'app/scripts/libraries/**/*.js',
                        'app/scripts/locales/**/*.json',
                        'app/scripts/routers/**/*.js',
                        'app/scripts/application.js',
                        'app/scripts/main.js'
                    ]
                }
            }
        },
        removelogging: {
            dist: {
                src: '<%= yeoman.dist %>/scripts/**/*.js',
                dest: '<%= yeoman.dist %>/scripts/**/*.js',
                options: {
                    // see below for options. this is optional.
                }
            }
        },
        jsdoc: {
            dist: {
                src: [
                    '<%= yeoman.app %>/scripts/**/*.js',
                    '<%= yeoman.app %>/../README.md'
                ],
                options: {
                    destination: 'doc'
                }
            }
        },
        jasmine: {
            test: {
                options: {
                    src: [
                        'app/scritps/**/*.js'
                    ],
                    host: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>',
                    specs: [
                        'spec/*.spec.js'
                    ],
                    // helpers: 'spec/*Helper.js',
                    // template: 'custom.tmpl',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: 'test/scripts/mainJasmine.js'
                    },
                    outfile: 'test/jasmine.html',
                    timeout: 30000, // 30s
                    // styles: [
                    //     'spec/*.css'
                    // ],
                    version: '1.3.1',
                    keepRunner: true
                }
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'copy:trendFont',
            'copy:trendImages',
            'coffee:dist',
            // 'compass:server',
            'less',
            'livereload-start',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'clean:test',
        'shell:copyDotGrunt',
        'coffee',
        // 'compass',
        // 'less',
        'connect:test',
        'jasmine:test',
        'open:serverTest',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'coffee:dist',
        'copy:trendFont',
        'copy:trendImages',
        // 'compass:dist',
        'less',
        'useminPrepare',
        // 'shell:createDist',
        // 'shell:linkComponenets',
        'copy:prepareRequirejs',
        'requirejs',
        'imagemin',
        'svgmin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
