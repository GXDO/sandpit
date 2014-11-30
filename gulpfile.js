var gulp = require('gulp');
var gutil = require('gulp-util');
var peg = require('gulp-peg');
var mocha = require('gulp-mocha');

var paths = {
  peg:{
    grammer:'lib/grammer.peg',
    build:'lib'
  }
};

gulp.task('compile', function() {
  console.log('Compiling with PEG');
  gulp
    .src( paths.peg.grammer )
    .pipe(peg().on('error',gutil.log))
    .pipe( gulp.dest( paths.peg.build ) );  
});

gulp.task('mocha',['compile'] ,function() {
    return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['compile','mocha']);
});

gulp.task('build', ['compile']);

gulp.task('default', ['compile','mocha']);