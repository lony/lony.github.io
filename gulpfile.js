// config
var folderTemplates = 'template/',
    folderTarget = 'public';

// gulp packages
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    minifyCSS = require('gulp-clean-css'),
    minifyHTML = require('gulp-htmlmin'),
    markdown = require('gulp-markdown');

gulp.task('default', ['css', 'html', 'markdown'], function () {
    return gutil.log('Processed and ready to publish from: ' + folderTarget)
});

gulp.task('css', function () {
    gulp.src(folderTemplates + '*.css')
        .pipe(minifyCSS({debug: true}, function (details) {
            gutil.log(
                'minifyCSS: Reduced "' + details.name + '" ' +
                details.stats.originalSize + ' -> ' + details.stats.minifiedSize + ' bytes'
            );
        }))
        .pipe(gulp.dest(folderTarget));
});

gulp.task('html', function () {
    gulp.src(folderTemplates + '*.html')
        .pipe(minifyHTML({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
        }))
        .pipe(gulp.dest(folderTarget));
});

gulp.task('markdown', function () {
    gulp.src(folderTemplates + '*.md')
        .pipe(markdown())
        .pipe(gulp.dest(folderTarget));
});