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
                files: {
                    expand: true,
                    cwd: 'public_src/components/',
                    src: '**/*.less',
                    dest: 'public/components',
                    ext: '.css'
                }
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
                expand: true,
                cwd: 'public_src/',
                src: ['**/*.ts', '**/*.js'],
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
                    cwd: 'public_src/components/',
                    src: '**/*.js',
                    dest: 'public/components',
                    ext: '.js'
                }]
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
                files: ['public_src/components/**/*.ts'],
                tasks: ['ts', 'uglify:scripts']
            },
            styles: {
                files: ['public_src/components/**/*.less'],
                tasks: ['less']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['concat', 'ts', 'uglify:scripts', 'less']);
};
