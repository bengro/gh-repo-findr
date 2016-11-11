import gulp from 'gulp'
import fs from 'fs'
import path from 'path'
import {merge} from 'event-stream'
import map from 'map-stream'
import {spawn} from 'child_process'
const $ = require('gulp-load-plugins')();

gulp.task('clean', () => {
  return pipe('./tmp', $.clean())
});

gulp.task('chrome', () => {
  return merge(
    pipe('./icons/**/*', './tmp/chrome/icons'),
    pipe(['./src/**/*'], './tmp/chrome/'),
    pipe('./src/background.js', $.babel(), './tmp/chrome/')
  )
});

gulp.task('build', (cb) => {
  $.runSequence('clean', 'chrome', cb)
});

gulp.task('dist', ['build'], (cb) => {
  $.runSequence('chrome:zip', cb)
});

gulp.task('chrome:zip', () => {
  return pipe('./tmp/chrome/**/*', $.zip('chrome.zip'), './tmp/dist')
});

function pipe(src, ...transforms) {
  return transforms.reduce((stream, transform) => {
    const isDest = typeof transform === 'string'
    return stream.pipe(isDest ? gulp.dest(transform) : transform)
  }, gulp.src(src))
}
