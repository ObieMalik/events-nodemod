module.exports = function(grunt) {
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-tslint");
	grunt.loadNpmTasks("grunt-ts");

	grunt.initConfig({
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['build/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
        jshint: {
            files   : ['Gruntfile.js', 'package.json', 'src/server.js', 'lib/**/*.js', 'src/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
		tslint: {
			options: {
				configuration: "tslint.json",
				force: false
			},
			all: {
				src: ['src/**/*.ts']
			}
		},
        watch: {
            files   : ['src/**/*.ts'], // files to watch
            tasks   : ['ts:build', 'tslint:all'], // tasks to run
	        options: {
            	spawn: false // makes this task faster
	        }
        },
        ts: {
            build: {
                tsconfig: './tsconfig.json'
            }
        }
    });

    grunt.registerTask("default", ["tslint:all", "ts:build", "watch"]);
};
