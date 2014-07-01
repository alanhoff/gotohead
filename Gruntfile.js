/*
 * gotohead
 * Get a css snippet and put into the style tag on head of HTML document.
 *
 * Copyright (c) 2014 Belchior Oliveira
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

   // Project configuration.
   grunt.initConfig({
      jshint: {
         all: [
            'Gruntfile.js',
            'tasks/*.js',
            '<%= nodeunit.tests %>'
         ],
         options: {
            jshintrc: '.jshintrc'
         }
      },

      // Before generating any new files, remove any previously-created files.
      clean: {
         tests: ['test/tmp']
      },

      // Configuration to be run (and then tested).
      gotohead: {
         html: {
            options: {
               jade: false,
               type: 'css'
            },
            files: [
               {
                  orig: 'test/fixtures/html/html.html',
                  dest: 'test/tmp/html.html',
                  src: ['test/fixtures/css/css1.css', 'test/fixtures/css/css2.css']
               },
               {
                  orig: 'test/fixtures/html/htmlWithoutSignature.html',
                  dest: 'test/tmp/htmlWithoutSignature.html',
                  src: ['test/fixtures/css/css1.css', 'test/fixtures/css/css2.css']
               }
            ]
         },
         jade: {
            options: {
               jade: true,
               type: 'css'
            },
            files: [
               {
                  orig: 'test/fixtures/jade/template.jade',
                  dest: 'test/tmp/template.jade',
                  src: ['test/fixtures/css/css1.css', 'test/fixtures/css/css2.css']
               },
               {
                  orig: 'test/fixtures/jade/templateWithoutSignature.jade',
                  dest: 'test/tmp/templateWithoutSignature.jade',
                  src: ['test/fixtures/css/css1.css', 'test/fixtures/css/css2.css']
               },
               {
                  orig: 'test/fixtures/jade/templateIndentedBySpace.jade',
                  dest: 'test/tmp/templateIndentedBySpace.jade',
                  src: ['test/fixtures/css/css1.css', 'test/fixtures/css/css2.css']
               },
            ]
         },
         javascript: {
            options: {
               jade: false,
               type: 'js'
            },
            files: [
               {
                  orig: 'test/fixtures/html/htmlWithJavascript.html',
                  dest: 'test/tmp/htmlWithJavascript.html',
                  src: ['test/fixtures/js/script1.js', 'test/fixtures/js/script2.js']
               }
            ]
         },
      },

      // Unit tests.
      nodeunit: {
         tests: ['test/*_test.js']
      }

   });

   // Actually load this plugin's task(s).
   grunt.loadTasks('tasks');

   // These plugins provide necessary tasks.
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-nodeunit');

   // Whenever the "test" task is run, first clean the "tmp" dir, then run this
   // plugin's task(s), then test the result.
   grunt.registerTask('test', ['clean', 'gotohead', 'nodeunit']);

   // By default, lint and run all tests.
   grunt.registerTask('default', ['jshint', 'test']);
   // grunt.registerTask('default', ['gotohead']);

};
