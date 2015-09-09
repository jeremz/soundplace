var gulp = require('gulp'),
	  webpack = require('webpack-stream'),
	  gutil = require("gulp-util"),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

// Styles Watch
gulp.task('styles', function() {
  return sass('assets/styles/main.scss', { style: 'expanded' })
    .pipe(gulp.dest('public/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Styles Prod
gulp.task('stylesProd', function() {
  return sass('assets/styles/main.scss', { style: 'expanded' })
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('public/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts Watch
gulp.task('scripts', function() {
  return gulp.src('assets/scripts/**/*.js')
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.src('assets/scripts/main.js'))
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('public/'))
    .pipe(notify({ message: 'Scripts task complete' }))
});

// Scripts Prod
gulp.task('scriptsProd', function() {
  return gulp.src('assets/scripts/**/*.js')
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.src('assets/scripts/main.js'))
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('public/'))
    .pipe(notify({ message: 'Scripts task complete' }))
});


// Images
gulp.task('imagesProd', function() {
  return gulp.src('assets/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('public/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['public/scripts', 'public/styles', 'public/images'], cb)
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

// Prod
gulp.task('prod', ['clean','stylesProd','scriptsProd','imagesProd'], function() {
    notify({ message: 'task Prod complete' })
});

// Watch
gulp.task('watch', ['styles','scripts'], function() {

  // Watch .scss files
  gulp.watch('assets/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('assets/scripts/**/*.js', ['scripts']);

  // Create LiveReload server
  // livereload.listen();

  // Watch any files in dist/, reload on change
  // gulp.watch(['public/**']).on('change', livereload.changed);

});