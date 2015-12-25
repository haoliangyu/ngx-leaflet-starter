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
                files: [{
                    expand: true,
                    cwd: 'public_src/',
                    src: '**/*.less',
                    dest: 'public/',
                    ext: '.css'
                }]
            }
        },
        concat: {
            styles: {
                src: externalStyleFiles,
                dest: 'public/libs/styles.css',
                nonull: true
            },
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
                expand: true,
                cwd: 'public_src/',
                src: '**/*.ts',
                dest: 'public/',
                ext: '.js'
            }
        },
        uglify: {
            libs: {
                'public/libs/scripts.js': ['public/libs/scripts.js']
            },
            scripts: {
                files: [{
                    expand: true,
                    cwd: 'public_src/',
                    src: '**/*.js',
                    dest: 'public/',
                    ext: '.js'
                }]
            }
        },
        htmlmin: {
            app: {
                expand: true,
                cwd: 'public_src/',
                src: '**/*.html',
                dest: 'public/'
            }
        },
        clean: {
            public: {
                src: ['public', '!public/README.md']
            },
            compile: {
                src: ['public_src/**/*.js', 'public_src/**/*.js.map', '!public_src/system.config/js']
            }
        },
        watch: {
            options: {
                livereload: true
            },
            libs: {
                files: ['externalScriptFiles.json', 'externalStyleFiles.json'],
                tasks: ['concat']
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
                tasks: ['htmlmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['clean:public', 'concat', 'ts', 'clean:compile', 'uglify:scripts', 'less', 'htmlmin']);
};
