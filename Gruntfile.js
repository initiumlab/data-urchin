/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },
    rsync: {
      options: {
        args: ["--verbose"],
        exclude: [".git*", "*.scss", "node_modules"],
        recursive: true
      },
      showcase: {
        options: {
          src: "./dist/",
          dest: "/home/vagrant/web/data-urchin",
          host: "showcase",
          delete: true // Careful this option could cause data loss, read the docs!
        }
      }
    },
    shell: {
      initDist: {
        command: [
          'rm -rf dist/',
          'mkdir -p dist'
        ].join('&&')
      },
      compile: {
        command: [
          'ipython nbconvert --to html boilerplates/Sample.ipynb',
          'mv Sample.html dist/'
        ].join('&&')
      },
      executeAndCompile: {
        command: [
          'ipython nbconvert --to html --ExecutePreprocessor.enabled=True boilerplates/Sample.ipynb',
          'mv Sample.html dist/'
        ].join('&&')
      }
    },
    'gh-pages': {
      options: {
        // Options for all targets go here.
      },
      'gh-pages': {
        options: {
          base: 'dist/'
        },
        src: ['**']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-rsync');
  grunt.loadNpmTasks('grunt-gh-pages');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('build:quick', ['shell:initDist', 'shell:compile']);
  grunt.registerTask('build:complete', ['shell:initDist', 'shell:executeAndCompile']);
  grunt.registerTask('build', 'build:complete');
  grunt.registerTask('deploy:staging', ['rsync:showcase']);
  grunt.registerTask('deploy:prod', ['gh-pages:gh-pages']);

};
