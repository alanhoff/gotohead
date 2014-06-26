/*
 * gotohead
 * Get a css snippet and put into the style tag on head of HTML document.
 *
 * Copyright (c) 2014 Belchior Oliveira
 * Licensed under the MIT license.
 */

'use strict';
var CleanCSS = require('clean-css');

module.exports = function(grunt) {

   // Please see the Grunt documentation for more information regarding task
   // creation: http://gruntjs.com/creating-tasks

   grunt.registerMultiTask('gotohead', 'Get a css snippet and put into the style tag on head of HTML document.', function() {
      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({});

      // Iterate over all specified file groups.
      this.files.forEach(function(f) {
         // Concat specified files.
         var style = f.src.filter(function(filepath) {
            // Warn on and remove invalid source files (if nonull was set).
            if (!grunt.file.exists(filepath)) {
               grunt.log.warn('Source file "' + filepath + '" not found.');
               return false;
            } else {
               return true;
            }
         }).map(function(filepath) {
            var source = grunt.file.read(filepath);
            return new CleanCSS().minify(source);
         }).join('');

         return goToHead(options, f.dest, style);
      });
   });

   function goToHead(options, dest, newStyle){
      return options.jadeCompatibility ? jade(options, dest, newStyle) : html(options, dest, newStyle);
   }

   function jade(options, dest, newStyle){
      try{
         if( !grunt.file.exists(options.orig) ){
            throw 'Source file "' + options.orig + '" not found.';
         }

         var template = grunt.file.read(options.orig);
         if( template.search(/head[\s\S]*(.*)body/g) < 0 ){
            throw 'Tag head is not found in '+options.orig;
         }

         var signature = 'style(data-above-the-fold="true" type="text/css").';
         var identation = '\t';
         if( template.search(/(\s*)style.*data-above-the-fold="true".*/i) >= 0 ){
            var identationStyle = template.match(/(\s*)style.*data-above-the-fold="true".*/i)[1];
            newStyle =
               identationStyle + signature +
               identationStyle + identation + newStyle;
            template = template.replace(/(\s*)style.*data-above-the-fold="true".*/g, newStyle);

         } else {
            var identationHead = template.match(/(\s*)head/i)[1];
            var identationBody = template.match(/(\s*)body/i)[1];
            newStyle =          identation + signature +
               identationHead + identation + identation + newStyle +
               identationBody + 'body';
            template = template.replace(/body/g, newStyle);
         }

         // Write the destination file.
         grunt.file.write(dest, template);

         // Print a success message.
         grunt.log.writeln('File: '+dest+' was updated');
         return true;

      } catch(msg){
         var err = new Error(msg);
         grunt.fail.warn(err);
         return false;
      }
   }
   function html(options, dest, newStyle){
      try{
         if( !grunt.file.exists(options.orig) ){
            throw 'Source file "' + options.orig + '" not found.';
         }

         var content = grunt.file.read(options.orig);
         if( content.search(/<head>[\s\S]*(.*?)<\/head>/g) < 0 ){
            throw 'Tag head is not found in '+options.orig;
         }
         var signature = '<style data-above-the-fold="true" type="text/css">';
         newStyle = signature + newStyle + '</style>';

         if( content.search(signature) >= 0 ){
            var oldStyle = content.match(new RegExp(signature+'[\\s\\S]*(.*?)<\\/style>', 'g'))[0];
            content = content.replace(oldStyle, newStyle);

         } else {
            var identationHead = content.match(/(\s*)<\/head>/i)[1];
            newStyle =          '   ' + newStyle +
               identationHead + '</head>';
            content = content.replace(/<\/head>/g, newStyle);
         }

         // Write the destination file.
         grunt.file.write(dest, content);

         // Print a success message.
         grunt.log.writeln('File: '+dest+' was updated');
         return true;

      } catch(msg){
         var err = new Error(msg);
         grunt.fail.warn(err);
         return false;
      }
   }

};
