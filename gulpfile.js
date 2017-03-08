//載入套件的方法
var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    del = require('del');


//這裡的task即是我們要定義這一項任務的方法，這裡的 webserver 是自行定義的任務名稱
gulp.task('webserver', function () {
    gulp.src('./src/') //來源檔案
        .pipe(webserver({ //.pipe 是這個任務當中的流程
            port: 1000,
            livereload: true,
            directoryListing: false,
            open: true,
            fallback: 'index.html'
        }));
});

//刪除目的地資料夾
gulp.task('clean', function () {
    return del(['./dist']);
});

//合併
gulp.task('concatCSS', function () {
    return gulp.src('./src/includes/css/*.css')
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('./dist/'));
});
gulp.task('concatJS', function () {
    return gulp.src('./src/includes/script/*.js')
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./dist/'));
});

//css壓縮
gulp.task('minify-css', ['concatCSS'], function () {
    return gulp.src('./dist/bundle.css')
        .pipe(cleanCSS())
        .pipe(rename(function (path) {
            // path.basename += ".min";
            path.extname = ".css";
        }))
        .pipe(gulp.dest('./dist/'));
});

//js壓縮
gulp.task('uglify', ['concatJS'] ,function () {
    return gulp.src('./dist/bundle.js')
        .pipe(uglify())
        .pipe(rename(function (path) {
            // path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('./dist/'));
});

//監看
gulp.task('watch', function(){
    //監看css
    gulp.watch('./src/includes/css/*.css', ['minify-css']);
    //監看js
    gulp.watch('./src/includes/script/*.js', ['uglify']);
});


gulp.task('default', ['clean', 'webserver', 'minify-css', 'uglify', 'watch']);