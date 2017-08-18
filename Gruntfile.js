module.exports = function(grunt){

    grunt.initConfig({
        watch: {
            html: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                options: {
                    livereload: true
                }
            },
            uglify: {
                files: ['public/**/*.js'],
                tasks: ['jshint'],
                options: {
                livereload: true
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['public/libs/**/*.js']
            },
            all: ['public/js/*.js', 'app/**/*.js']
        },

        uglify: {
            development: {
                files: {
                    'public/build/admin.min.js': 'public/js/admin.js',
                    'public/build/detail.min.js': [
                        'public/js/detail.js'
                    ]
                }
            }
        },

        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        concurrent: {
            tasks: ['nodemon', 'watch', 'jshint'],
            options: {
                logConcurrentOutput: true
            }
        }
    })

    grunt.loadNpmTasks("grunt-concurrent")
    grunt.loadNpmTasks("grunt-contrib-jshint")
    grunt.loadNpmTasks("grunt-contrib-uglify")
    grunt.loadNpmTasks("grunt-contrib-watch")
    // grunt.loadNpmTasks("grunt-mocha-test")
    grunt.loadNpmTasks("grunt-nodemon")

    grunt.option('force', true)

    grunt.registerTask('default', ['concurrent'])
    // grunt.registerTask('test', ['mochaTest'])
}