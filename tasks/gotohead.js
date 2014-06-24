/*
 * gotohead
 * gotohead
 *
 * Copyright (c) 2014 Belchior Oliveira
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

   // Please see the Grunt documentation for more information regarding task
   // creation: http://gruntjs.com/creating-tasks

   grunt.registerMultiTask('gotohead', 'Get a css snippet and put into the style tag on head of HTML document.', function() {
      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({});

      // Iterate over all specified file groups.
      this.files.forEach(function(f) {
         // Concat specified files.
         var css = f.src.filter(function(filepath) {
            // Warn on and remove invalid source files (if nonull was set).
            if (!grunt.file.exists(filepath)) {
               grunt.log.warn('Source file "' + filepath + '" not found.');
               return false;
            } else {
               return true;
            }
         }).map(function(filepath) {
            // Read file source.
            return grunt.file.read(filepath);
         }).join(grunt.util.normalizelf(''));

         return goToHead(f.dest, css);
      });
   });

   function goToHead(htmlfile, newStyle){
      try{
         if( !grunt.file.exists(htmlfile) ){
            throw 'Source file "' + htmlfile + '" not found.';
         }

         var html = grunt.file.read(htmlfile);
         if( html.search(/<head>[\s\S]*(.*?)<\/head>/g) < 0 ){
            throw 'Tag head is not found in '+htmlfile;
         }
         var signature = '<style data-above-the-fold="true" type="text/css">';
         newStyle = signature + newStyle + '</style>';

         if( html.search(signature) > 0 ){
            var oldStyle = html.match(new RegExp(signature+'[\\s\\S]*(.*?)<\\/style>', 'g'))[0];
            html = html.replace(oldStyle, newStyle);
         } else {
            html = html.replace(/<\/head>/g, newStyle+'\n</head>');
         }

         // Write the destination file.
         grunt.file.write(htmlfile, html);

         // Print a success message.
         grunt.log.writeln('File: '+htmlfile+' updated');
         return true;

      } catch(msg){
         var err = new Error(msg);
         grunt.fail.warn(err);
         return false;
      }
   }
};
