var gulp = require('gulp');
var gutil = require('gulp-util');
var inject = require("gulp-inject");
var es = require('event-stream');
var wiredep = require('wiredep');
var path = require('path');
var fs = require("fs");

var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var changed = require('gulp-changed');

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
        gulp.src(bower_js)
            .pipe(concat("bower.js"))
            .pipe(uglify())
            .pipe(gulp.dest(path.join(fdst,'js'))),
        gulp.src(bower_css)
            .pipe(concat("bower.css"))
            .pipe(minifyCSS())
            .pipe(gulp.dest(path.join(fdst,'css')))
    );

    var app_assets = es.merge(
        gulp.src([fsrc+'/js/**/*.js'])
            .pipe(concat("app.js"))
            .pipe(uglify())
            .pipe(gulp.dest(path.join(fdst,'js'))),
        gulp.src([fsrc+'/css/**/*.css'])
            .pipe(concat("app.css"))
            .pipe(minifyCSS())
            .pipe(gulp.dest(path.join(fdst,'css')))
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
        .pipe(changed(path.join(__dirname)))
        .pipe(gulp.dest(path.join(__dirname)))

    var s2 = gulp.src(path.join(__dirname,'img','**','*'))
        .pipe(gulp.dest(path.join(fdst,'img')))

    es.merge(s1,s2)
        .on('end', function() {
            cb()
        });
}

module.exports = build;
