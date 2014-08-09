---
title: Learn More About Themes
subtitle: ""
theme: wsmith
created: "Tue Aug 05 2014 21:25:42 GMT-0500 (CDT)"
---

Theme Overview
==============

Wikismith themes provide both the front-end build process and markdown rendering.  The build process
and rendering are respectively framework and templating language agnostic.

Theme Components
================

* package.json - Specifying theme's build dependencies

* bower.js - Specifying theme's front-end dependencies

* gulpfile.js - Build theme's assets and such

* index.js - Convert page markdown into HTML

## Package.json

The theme's package.json has the dependencies needed for the themes Gulfile.js and index.js.

#### Example

```json
{
  "name": "wikismith-theme-custom",
  "version": "0.0.3",
  "description": "Custom wikismith theme.",
  "main": "index.js",
  "author": "Jeffrey Hicks",
  "license": "MIT",
  "dependencies": {
    "ejs": "^1.0.0",
    "event-stream": "^3.1.7",
    "gulp-inject": "^1.0.0",
    "gulp-util": "^3.0.0",
    "highlight.js": "^8.1.0",
    "marked": "^0.3.2",
    "wiredep": "^1.8.2",
    "xregexp": "^2.0.0"
  }
}
```

## Bower.json

This example bower.json simply specifies bootstrap as a dependency.

#### Example

```json
{
  "name": "Wikismith-theme-custom",
  "version": "0.0.1",
  "authors": [
    "jrhicks@gmail.com"
  ],
  "description": "Theme",
  "moduleType": [
    "node"
  ],
  "license": "MIT",
  "homepage": "wikismith.com",
  "private": true,
  "dependencies": {
    "bootstrap": "~3.2.0"
  }
}
```


## Gulpfile.js

A theme gulpfile is very similar to any project's gulpfile except for 2 differences that allow the
theme's build task to be called from the project's build.

1.  It exports a build method

2.  It assumes the cwd is **not** its directory


This example Gulpfile.js collects the application and bower assets, moves them to their
 destination and links them into template.html with inject.

#### Example
```javascript
var gulp = require('gulp');
var gutil = require('gulp-util');
var inject = require("gulp-inject");
var es = require('event-stream');
var wiredep = require('wiredep');
var path = require('path');
var fs = require("fs");

gulp.task('default', function(cb) {
    build(cb);
});

function build(cb) {
    var fsrc = __dirname;
    var fdst = path.join(process.cwd(), 'build', 'wsmith');
    var bower_options = {
        directory:  path.join(fsrc, 'bower_components'),
        bowerJson:  require(path.join(fsrc, 'bower.json'))
    }
    var bower_js = wiredep(bower_options).js || 'undefined';
    var bower_css = wiredep(bower_options).css || 'undefined';
    var bower_assets = es.merge(
        gulp.src(bower_js).pipe(gulp.dest(path.join(fdst,'bower','js'))),
        gulp.src(bower_css).pipe(gulp.dest(path.join(fdst,'bower','css')))
    );
    var app_assets = es.merge(
        gulp.src([fsrc+'/js/**/*.js']).pipe(gulp.dest(path.join(fdst,'js'))),
        gulp.src([fsrc+'/css/**/*.css']).pipe(gulp.dest(path.join(fdst,'css')))
    );
    var s1 = gulp.src(path.join(__dirname, 'template.html'))
        .pipe(inject(es.merge(bower_assets),
            {
                ignorePath: '/build/',
                starttag: '<!-- bower:{{ext}} -->'
            }))
        .pipe(inject(es.merge(app_assets),
            {
                ignorePath: '/build/'
            }))
        .pipe(gulp.dest(path.join(__dirname)))

    var s2 = gulp.src(path.join(__dirname,'img','**','*'))
        .pipe(gulp.dest(path.join(fdst,'img')))

    es.merge(s1,s2)
        .on('end', function() {
            cb()
        });
}

module.exports = build;
```

## Index.js

The index.js exports a function that can receive a file object and
return a string representing the HTML of the final rendered page.

This example index.js customizes the markdown output for bootstrap,
performs a neat transformation causing h3 blocks to column up in row.
It also parses the markdown to give data to the EJS template to
assist with creating an index.

#### Example

```javascript
var marked = require('marked');
var highlight = require('highlight.js');
var ejs = require('ejs');
var path = require('path');
var fs = require("fs");

var renderer = new marked.Renderer();

function customizeMarked() {
    // omitted for brevity
}

function rowify_h3s(html) {
    // omitted for brevity
}

function render(file) {
    var template = String(fs.readFileSync(path.join(__dirname, 'template.html')));

    var h = marked(file.body);;
    var h2 = rowify_h3s(h);

    return ejs.render(template, {
        params: file.params,
        content: h2,
        ast: marked.lexer(file.body)
    });
}

customizeMarked()
module.exports = render;
```
