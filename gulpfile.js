var gulp = require('gulp');
var shell = require('gulp-shell');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Task for building blog when something changed:
gulp.task('build', shell.task(['jekyll build --watch -I']));
// Or if you don't use bundle:
// gulp.task('build', shell.task(['jekyll build --watch']));
gulp.task('styles', function() {
    gulp.src('assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/css/'))
});

//Watch task
gulp.task('sass:watch',function() {
    gulp.watch('assets/sass/**/*.scss',['styles']);
});

// Task for serving blog with Browsersync
gulp.task('serve', function () {
    browserSync.init({server: {baseDir: '_site/'}});
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['sass:watch', 'build', 'serve']);
