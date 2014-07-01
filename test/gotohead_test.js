'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.gotohead = {
   setUp: function(done) {
      // setup here if necessary
      done();
   },
   html: function(test) {
      test.expect(1);

      var actual = grunt.file.read('test/tmp/html.html');
      var expected = grunt.file.read('test/expected/html/html.html');
      test.equal(actual, expected, 'test if the content of both files are the same.');

      test.done();
   },
   htmlWithoutSignature: function(test) {
      test.expect(1);

      var actual = grunt.file.read('test/tmp/htmlWithoutSignature.html');
      var expected = grunt.file.read('test/expected/html/htmlWithoutSignature.html');
      test.equal(actual, expected, 'test if the content of both files are the same without signature.');

      test.done();
   },
   jade: function(test) {
      test.expect(1);

      var actual = grunt.file.read('test/tmp/template.jade');
      var expected = grunt.file.read('test/expected/jade/template.jade');
      test.equal(actual, expected, 'Jade: test if the content of both files are the same.');

      test.done();
   },
   jadeWithoutSignature: function(test) {
      test.expect(1);

      var actual = grunt.file.read('test/tmp/templateWithoutSignature.jade');
      var expected = grunt.file.read('test/expected/jade/templateWithoutSignature.jade');
      test.equal(actual, expected, 'Jade: test if the content of both files are the same without signature.');

      test.done();
   },
   jadeIndentedBySpace: function(test) {
      test.expect(1);

      var actual = grunt.file.read('test/tmp/templateIndentedBySpace.jade');
      var expected = grunt.file.read('test/expected/jade/templateIndentedBySpace.jade');
      test.equal(actual, expected, 'Jade: test if the content of both files are the same when code was indented by space.');

      test.done();
   },
   htmlWithJavascript: function(test) {
      test.expect(1);

      var actual = grunt.file.read('test/tmp/htmlWithJavascript.html');
      var expected = grunt.file.read('test/expected/html/htmlWithJavascript.html');
      test.equal(actual, expected, 'test if the content of both files are the same.');

      test.done();
   },
};
