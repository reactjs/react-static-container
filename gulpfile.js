'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');
var runSequence = require('run-sequence');
var babelPluginDEV = require('fbjs/scripts/babel/dev-expression');
var babelPluginModules = require('fbjs/scripts/babel/rewrite-modules');

var paths = {
  lib: 'lib',
  src: [
    'src/**/*.js',
    '!src/**/__tests__/**/*.js',
  ],
};

var babelOpts = {
  nonStandard: true,
  stage: 1,
  plugins: [babelPluginDEV, babelPluginModules],
  _moduleMap: {
    'React': 'react',
  }
};

gulp.task('clean', function(cb) {
  del([paths.lib], cb);
});

gulp.task('modules', function() {
  // We would normally also run the module map script here. However we're going
  // to manually manage that file since we want to go through the npm entry
  // point (index.js).
  return gulp
    .src(paths.src)
    .pipe(babel(babelOpts))
    .pipe(gulp.dest(paths.lib));
});

gulp.task('build', function(cb) {
  runSequence('clean', 'modules', cb);
});

gulp.task('default', ['build']);
