/*
 * gotohead
 * Get a css snippet and put into the style tag on head of HTML document.
 *
 * Copyright (c) 2014 Belchior Oliveira
 * Licensed under the MIT license.
 */

'use strict';
var CleanCSS = require('clean-css');
var UglifyJS = require("uglify-js");

module.exports = function(grunt) {

   // Please see the Grunt documentation for more information regarding task
   // creation: http://gruntjs.com/creating-tasks

   grunt.registerMultiTask('gotohead', 'Get a css snippet and put into the style tag on head of HTML document.', function() {
      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({});

      // Iterate over all specified file groups.
      this.files.forEach(function(f) {
         // Concat specified files.
         var src = f.src.filter(function(filepath) {
            // Warn on and remove invalid source files (if nonull was set).
            if (!grunt.file.exists(filepath)) {
               grunt.log.warn('Source file "' + filepath + '" not found.');
               return false;
            } else {
               return true;
            }
         }).map(function(filepath) {
            var source = grunt.file.read(filepath);
            if( options.type === 'css' ){
               return new CleanCSS().minify(source);

            } else if( options.type === 'js' ){
               return UglifyJS.minify(source, {fromString: true}).code;
            }
         }).join('');
         return goToHead(f.orig, src, options);
      });
   });

   function goToHead(file, source, options){
      return options.jade ? jade(file, source, options) : html(file, source, options);
   }

   function html(file, source, options){
      try{
         if( !grunt.file.exists(file.orig) ){
            throw 'Source file "' + file.orig + '" not found.';
         }

         var content = grunt.file.read(file.orig);
         if( content.search(/<head>[\s\S]*(.*?)<\/head>/g) < 0 ){
            throw 'Tag HEAD is not found in '+file.orig;
         }

         var type;
         if( options.type === 'css' ){
            type = 'style';
         } else if( options.type === 'js' ){
            type = 'script';
         }

         var signature = '<'+type+' data-above-the-fold="true">';
         source = signature + source + '</'+type+'>';

         if( content.search(signature) >= 0 ){
            var oldStyle = content.match(new RegExp(signature+'[\\s\\S]*(.*?)<\\/'+type+'>', 'g'))[0];
            content = content.replace(oldStyle, source);

         } else {
            var indentHead = content.match(/(\s*)<\/head>/i)[1];
            source = '   ' + source + indentHead + '</head>';
            content = content.replace(/<\/head>/g, source);
         }

         // Write the destination file.
         grunt.file.write(file.dest, content);

         // Print a success message.
         grunt.log.ok('File: '+file.dest+' was updated');
         return true;

      } catch(msg){
         var err = new Error(msg);
         grunt.fail.warn(err);
         return false;
      }
   }

   function jade(file, source, options){
      try{
         if( !grunt.file.exists(file.orig) ){
            throw 'Source file "' + file.orig + '" not found.';
         }

         var template = grunt.file.read(file.orig);
         if( template.search(/head/g) < 0 ){
            throw 'Tag HEAD is not found in '+file.orig;
         }

         var type;
         if( options.type === 'css' ){
            type = 'style';
         } else if( options.type === 'js' ){
            type = 'script';
         }

         var signature = type+'(data-above-the-fold="true")';
         var indent = template.match(/\n\s+head/)[0].replace(/\n/, '').replace(/\w+/, '');
         if( template.search(new RegExp(type +'.*data-above-the-fold="true".*','g')) >= 0 ){
            var indentStyle = template.match(new RegExp(type +'.*data-above-the-fold="true".*','i'))[1];
            source = signature +' ' + source;
            template = template.replace(new RegExp(type +'.*data-above-the-fold="true".*','g'), source);

         } else {
            var indentHead = template.match(/(\s*)head/i)[1];
            var indentBody = template.match(/(\s*)body/i)[1];
            source = indent + signature + ' ' + source + indentBody + 'body';
            template = template.replace(/body/g, source);
         }

         // Write the destination file.
         grunt.file.write(file.dest, template);

         // Print a success message.
         grunt.log.ok('File: '+file.dest+' was updated');
         return true;

      } catch(msg){
         var err = new Error(msg);
         grunt.fail.warn(err);
         return false;
      }
   }
};
