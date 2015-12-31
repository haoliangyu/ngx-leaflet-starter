module.exports = function(grunt) {

    var externalStyleFiles = grunt.file.readJSON('externalStyleFiles.json');
    var externalScriptFiles = grunt.file.readJSON('externalScriptFiles.json');

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            compile: {
                options: {
                    compress: true
                },
                expand: true,
                cwd: 'public_src/',
                src: '**/*.less',
                dest: 'public/',
                ext: '.css',
                extDot: 'last'
            }
        },
        concat: {
            // Scripts need to be concated first, otherwise there will be error.
            scripts: {
                src: externalScriptFiles,
                dest: 'public/libs/scripts.js',
                nonull: true
            }
        },
        ts: {
            compile: {
                options: {
                    additionalFlags: '--module system --experimentalDecorators --moduleResolution node'
                },
                src: 'public_src/**/*.ts'
            }
        },
        uglify: {
            libs: {
                dest: 'public/libs/scripts.js',
                src : 'public/libs/scripts.js',
                nonull: true
            },
            scripts: {
                expand: true,
                cwd: 'public_src/',
                src: '**/*.js',
                dest: 'public/',
                ext: '.js',
                extDot: 'last'
            },
            config: {
                src: 'public_src/system.config.js',
                dest: 'public/system.config.js'
            }
        },
        cssmin: {
            libs: {
                src : externalStyleFiles,
                dest: 'public/libs/styles.css',
                nonull: true
            }
        },
        clean: {
            public: {
                src: ['public', '!public/README.md']
            },
            compile: {
                src: ['public_src/**/*.js', 'public_src/**/*.js.map', '!public_src/system.config.js']
            }
        },
        copy: {
            font: {
                expand: true,
                cwd: 'node_modules/font-awesome/',
                src: 'fonts/*',
                dest: 'public',
                nonull: true
            },
            html: {
                expand: true,
                cwd: 'public_src/',
                src: '**/*.html',
                dest: 'public/',
                ext: '.html',
                extDot: 'last'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            libs: {
                files: ['externalScriptFiles.json', 'externalStyleFiles.json'],
                tasks: ['concat', 'ulgify:libs', 'cssmin']
            },
            config: {
                files: ['public_src/system.config.js'],
                tasks: ['uglify:config']
            },
            scripts: {
                files: ['public_src/**/*.ts'],
                tasks: ['ts', 'uglify:scripts', 'clean:compile']
            },
            styles: {
                files: ['public_src/**/*.less'],
                tasks: ['less']
            },
            html: {
                files: ['public_src/**/*.html'],
                tasks: ['copy:html']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['clean:public', 'cssmin', 'concat', 'ts', 'uglify', 'clean:compile', 'less', 'copy']);
};
