'use strict';

const gulp = require('gulp'),
  rollup = require('rollup-stream'),
  source = require('vinyl-source-stream'),
  babel = require('rollup-plugin-babel'),
  clean = require('gulp-clean'),
  runSequence = require('run-sequence'),
  inject = require('gulp-inject'),
  karmaServer = require('karma').Server,
  crx = require('gulp-crx-pack'),
  fs = require('fs'),
  TMP_UNPACKED_PATH = 'tmp/unpacked-extension',
  mocha = require('gulp-mocha');

gulp.task('bundle-extension', function (done) {
  runSequence('clean',
    'copy-assets',
    'process-extension-js',
    'process-content-script-js',
    'inject-js',
    done);
});

gulp.task('clean', () => {
  return gulp.src('./tmp/unpacked-extension/*').pipe(clean());
});

gulp.task('copy-assets', function () {
  return gulp.src('src/**/*.{json,png}')
    .pipe(gulp.dest(TMP_UNPACKED_PATH));
});

gulp.task('process-extension-js', function () {
  return rollup({
    entry: './src/main.js',
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
  })
    .pipe(source('main-bundle.js'))
    .pipe(gulp.dest(TMP_UNPACKED_PATH));
});

gulp.task('process-content-script-js', function () {
  return rollup({
    entry: './src/content-script.js',
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
  })
    .pipe(source('content-script.js'))
    .pipe(gulp.dest(TMP_UNPACKED_PATH));
});

gulp.task('inject-js', function () {
  var target = gulp.src('src/extension_home.html');
  var sources = gulp.src([TMP_UNPACKED_PATH + '/main-bundle.js'], {read: false});

  return target.pipe(inject(sources, {ignorePath: `/${TMP_UNPACKED_PATH}/`}))
    .pipe(gulp.dest(TMP_UNPACKED_PATH));
});

gulp.task('dev', function () {
  return gulp.watch('src/*.{js,html}', ['bundle-extension'])
});

gulp.task('test', ['bundle-extension'], function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function () {
    done();
  }).start();
});

gulp.task('e2e', ['dist'], function () {
  return gulp.src(['src/*e2e.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec',
      timeout: 5000
    }));
});

gulp.task('dist', function () {
  return gulp.src(TMP_UNPACKED_PATH)
    .pipe(crx({
      privateKey: fs.readFileSync('tmp/extension_key.pem', 'utf8'),
      filename: 'gh-repo-findr.crx'
    }))
    .pipe(gulp.dest('./tmp/dist'));
});