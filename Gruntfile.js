module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	uglify: {
      options: {
        compress: {
          //drop_console: true,
          cascade: true,
          passes: 3,
          warnings: true
        },
        banner: '/*! <%= pkg.name %> (<%= pkg.version %>) <%= grunt.template.today("yyyy-mm") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
	},
	watch: {
      files: ["src/<%= pkg.name %>.js"],
      tasks: ['uglify']
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        options: {
          frameworks: ['jasmine'],
          singleRun: true,
          browsers: ['Firefox'],
          files: [
            'dist/*.js',
            'tests/*.test.js'
          ]
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: [
        'src/*.js'
      ]
    }
  });

  grunt.registerTask('build', ['jshint','uglify']);
  grunt.registerTask('default', ['jshint', 'uglify']);

  grunt.registerTask('test', [
    'build',
    'karma'
  ]);
};
