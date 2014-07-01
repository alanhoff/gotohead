# Go to HEAD

> Put into the HEAD of a HTML document snippets of code CSS or Javascript.

Você que se preocupa com performance nos websites que desenvolve, certamente se preocupa em minificar seu CSS e Javascript, provavelmente você otimiza as imagens que serão exibidas, mas e a renderizão de tudo isso nos browsers você se importa?
Este plugin para Grunt quer ajudar você nessa tarefa.

Ao separar o código dos [elementos acima da borda](https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent) dos demais é possível otimizar a velocidade de renderizão da página, obtendo assim um ganho de performance.

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
        jade: false,
        type: 'css'
      },
      files: [
        { orig: 'path/to/original/html.html',
          dest: 'path/to/updated/html.html',
          src: [ 'public/css/style1.css', 'public/css/style2.css' ] }
      ]
    }
  }
});
```
You don't need minify your code because it will be done automatically.

### Options

#### Jade
Type: `boolean`
Default value: `false`

Used to update your HTML template wrote with Jade Template Engine.

#### Type
Type: `string`

Used to determine what type of file is.

Values                     | Description
---------------------------|---------------------------------------------------------
css                        | Default value. For css code.
js                         | For Javascript code.
