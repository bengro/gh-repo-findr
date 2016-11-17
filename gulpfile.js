var gulp = require('gulp'),
  rollup = require('rollup-stream'),
  source = require('vinyl-source-stream'),
  babel = require('rollup-plugin-babel'),
  clean = require('gulp-clean'),
  runSequence = require('run-sequence'),
  inject = require('gulp-inject');

let tmp_unpacked = 'tmp/unpacked-extension';

gulp.task('bundle-extension', function (done) {
  runSequence('clean', 'copy-assets', 'process-js', 'inject-js', done)
});

gulp.task('clean', () => {
  return gulp.src('./tmp/unpacked-extension/*').pipe(clean());
});

gulp.task('copy-assets', function () {
  return gulp.src('src/**/*.{json,png}')
    .pipe(gulp.dest(tmp_unpacked));
});

gulp.task('process-js', function () {
  return rollup({
    entry: './src/main.js',
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
  })
    .pipe(source('main-bundle.js'))
    .pipe(gulp.dest(tmp_unpacked));
});

gulp.task('inject-js', function () {
  var target = gulp.src('src/extension_home.html');
  var sources = gulp.src([tmp_unpacked + '/main-bundle.js'], {read: false});
  return target.pipe(inject(sources, {ignorePath: '/tmp/unpacked-extension/'})).pipe(gulp.dest(tmp_unpacked));
});