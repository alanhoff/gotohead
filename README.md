# gotohead

> Get css snippets and put into the style tag on head of HTML document.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-gotohead --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('gotohead');
```

## The "gotohead" task

### Overview
In your project's Gruntfile, add a section named `gotohead` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gotohead: {
     my_task: {
        options: {
           jadeCompatibility: false,
           orig: 'path/to/original/html.html'
        },
        files: {
           'path/to/updated/html.html': [
              'public/css/style1.css',
              'public/css/style2.css'
           ]
        }
     }
  }
});
```
You don't need minify your css code because it will be done automatically.

### Options

#### Jade compatibility
Type: `boolean`
Default value: `false`

Used to update your HTML template wrote with Jade Template Engine.

## Release History
_(Nothing yet)_
