/*
 * gotohead
 * gotohead
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
               jadeCompatibility: false,
               orig: 'test/fixtures/html/html.html'
            },
            files: {
               'test/tmp/html.html': [
                  'test/fixtures/css1.css',
                  'test/fixtures/css2.css'
               ]
            }
         },
         htmlWithoutSignature: {
            options: {
               jadeCompatibility: false,
               orig: 'test/fixtures/html/htmlWithoutSignature.html'
            },
            files: {
               'test/tmp/htmlWithoutSignature.html': [
                  'test/fixtures/css1.css',
                  'test/fixtures/css2.css'
               ]
            }
         },
         jade: {
            options: {
               jadeCompatibility: true,
               orig: 'test/fixtures/jade/template.jade'
            },
            files: {
               'test/tmp/template.jade': [
                  'test/fixtures/css1.css',
                  'test/fixtures/css2.css'
               ]
            }
         },
         jadeWithoutSignature: {
            options: {
               jadeCompatibility: true,
               orig: 'test/fixtures/jade/templateWithoutSignature.jade'
            },
            files: {
               'test/tmp/templateWithoutSignature.jade': [
                  'test/fixtures/css1.css',
                  'test/fixtures/css2.css'
               ]
            }
         }
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

};
