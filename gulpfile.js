var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var annotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');

// Concatnate 3rd party modules with duo
gulp.task('components', function() {

  gulp
  .src([
    'bower_components/angular/angular.js',
    'bower_components/lodash/dist/lodash.compat.js',
  ])
  .pipe(concat('components.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'))
  ;

});

// Concat and compress main scripts
gulp.task('scripts', function() {

  gulp
  .src([
    './src/main.js',
    './src/**/*.js'
  ])
  .pipe(plumber())
  .pipe(concat('main.js'))
  .pipe(annotate())
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'))
  ;

});


// Convert stylus files
gulp.task('stylus', function() {

  gulp
  .src([
    './templates/stylus/main.styl'
  ])
  .pipe(plumber())
  .pipe(stylus({
    compress: true
  }))
  .pipe(gulp.dest('dist/css/'))
  ;

});

// Convert jade files
gulp.task('jade', function() {

  gulp
  .src('./templates/jade/index.jade')
  .pipe(plumber())
  .pipe(jade())
  .pipe(gulp.dest('dist/'))
  ;

  gulp
  .src('./templates/jade/template/**/*.jade')
  .pipe(plumber())
  .pipe(jade())
  .pipe(templateCache({
    module: 'ngMineSweeper'
  }))
  .pipe(gulp.dest('dist/js/'))
  ;

});

gulp.task('webserver',['stylus','jade','components','scripts'],function(){
  gulp
  .src('./dist')
  .pipe(
    webserver({
      port: 9999,
      livereload: false
    })
  );

  gulp.watch('templates/stylus/**/*', ['stylus']);
  gulp.watch('templates/jade/**/*', ['jade']);
  gulp.watch('src/**/*', ['scripts']);
  gulp.watch('components.*', ['components']);

});

gulp.task('default',['webserver']);
