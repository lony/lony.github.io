// config
var folderTemplates = 'template/',
    folderContent = 'content/',
    folderTarget = 'public';

// gulp packages
var gulp = require('gulp'),
    path = require('path'),
    gutil = require('gulp-util'),
    print = require('gulp-print'),
    clean = require('gulp-clean'),
    order = require("gulp-order"),
    flatmap = require('gulp-flatmap'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-clean-css'),
    minifyHTML = require('gulp-htmlmin'),
    markdown = require('gulp-markdown');

gulp.task('default', ['clean', 'css', 'html', 'markdown'], function () {
    return gutil.log('Processed and ready to publish from: ' + folderTarget)
});

gulp.task('clean', function () {
    gulp.src(folderTarget + '/*')
        .pipe(clean({force: true}));
});

gulp.task('css', ['clean'], function () {
    gulp.src(folderTemplates + '*.css')
        .pipe(minifyCSS({debug: true}, function (details) {
            gutil.log(
                'CSS Reduced: "' + details.name + '" ' +
                details.stats.originalSize + ' -> ' + details.stats.minifiedSize + ' bytes'
            );
        }))
        .pipe(gulp.dest(folderTarget));
});

gulp.task('html', ['markdown'], function () {
    gulp.src(folderTemplates + '*.html')
        .pipe(order([
            "head.*",
            "post.*",
            "footer.*"
        ]))
        .pipe(print(function (filepath) {
            return "HTML Process: " + filepath;
        }))
        .pipe(concat('index.html'))
        //.pipe(minifyHTML({
        //    collapseWhitespace: true,
        //    minifyCSS: true,
        //    minifyJS: true,
        //    removeComments: true
        //}))
        .pipe(gulp.dest(folderTarget));
});

gulp.task('markdown', ['clean'], function () {
    gulp.src(folderContent + '*.md')

        .pipe(flatmap(function (stream, file) {
            var nameFull = path.basename(file.path),
                nameParts, nameBase, nameDate, nameTitle;

            nameParts = nameFull.split(".");
            nameBase = nameParts[0];
            nameParts = nameBase.split("_");
            nameDate = new Date(nameParts[0]).toISOString();
            nameTitle = nameParts[1];

            gutil.log('MD process (' + nameDate + "): " + nameTitle);

            var data = {
                title: nameTitle,
                date: nameDate,
                content: file.contents.toString('utf8')
            };


            gutil.log(JSON.stringify(data, null, 2));


            return stream;
        }))

    //.pipe(markdown())
    ////.pipe(minifyHTML({
    ////    collapseWhitespace: true,
    ////    minifyCSS: true,
    ////    minifyJS: true,
    ////    removeComments: true
    ////}))
    //.pipe(gulp.dest(folderTarget));
});