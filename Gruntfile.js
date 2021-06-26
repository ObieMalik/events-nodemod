module.exports = function (grunt) {
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-ts");
	grunt.loadNpmTasks("grunt-run");

	grunt.initConfig({
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['dist/src/**/*.js'],
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
		eslint: {
			options: {
				configFile: ".eslintrc.json",
				fix: grunt.option("fix")
			},
			target: [
				'src/**/*.ts',
				'test/**/*.ts'
			]
		},
		watch: {
			files: [
				'src/**/*.ts',
				'test/**/*.ts',
				'!**/*.d.ts'
			], // files to watch
			tasks: [
				'ts:build',
				'eslint:all'
			], // tasks to run
			options: {
				spawn: false // makes this task faster
			}
		},
		ts: {
			build: {
				tsconfig: './tsconfig.json'
			}
		},
		run: {
			test: {
				cmd: 'jest',
				args: [
					'--config',
					'jestconfig.json',
					'NODE_ENV',
					'development'
				]
			}
		}
	});

	grunt.registerTask("default", [
		"eslint",
		"ts:build",
		"run:test",
		"watch"
	]);

	grunt.registerTask("test", [
		"ts:build",
		"run:test"
	]);
};
