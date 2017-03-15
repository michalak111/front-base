'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    banner: " /* Jan Michalak */\n",

    project: {
      app: "src",
      assets: "<%= project.app %>/assets",
    },

    uglify:{
      options: {
        mangle:true,
      },

      main: {
        src: "<%= project.assets %>/js/source/main.js",
        dest: "<%= project.assets %>/js/main.min.js"
      },
      vendor : {
        src: "<%= project.assets %>/js/source/vendor.js",
        dest: "<%= project.assets %>/js/vendor.min.js"
      }
    },
    jshint: {
      options: {
        eqeqeq: true,
        curly: true,
      },

      target: {
        src: "<%= project.assets %>/js/source/main.js",
      }
    },

    concat: {
      options: {
        seperator: ";",
        banner: " /* Jan Michalak */\n",
      },

      target: {
        src:[
          "<%= project.assets %>/js/source/vendor/jquery-3.1.0.min.js",
        ],
        dest: "<%= project.assets %>/js/source/vendor.js",
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          "<%= project.assets %>/css/styles.css": "<%= project.assets %>/css/source/styles.scss",
        }
      }
    },

    watch: {
      source:{
        files: [
          "<%= project.assets %>/js/source/main.js",
          "<%= project.assets %>/css/source/{,*/}*.scss"
        ],
        tasks: ['jshint', 'sass'],
        options: {
          livereload: true,
        },
      },
    },

    express:{
      all:{
        options:{
          bases: ['./src'],
          port: 8080,
          hostname: "0.0.0.0",
          livereload: true
        }
      }
    },

    open: {
      all: {
        path: 'http://localhost:8080/index.html'
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask("default", ['jshint','concat','sass']);
  grunt.registerTask("dev", ['express','open','watch:source']);
};
