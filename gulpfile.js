//這兩行是 Node.js 載入套件的方法
var gulp = require('gulp');
var webserver = require('gulp-webserver'); 

//這裡的task即是我們要定義這一項任務的方法，這裡的 webserver 是自行定義的任務名稱
gulp.task('webserver', function(){ 
    gulp.src('./src/') //來源檔案
        .pipe(webserver({ //.pipe 是這個任務當中的流程
            port: 1000,
            livereload: true,
            directoryListing: false,
            open: true,
            fallback: 'index.html'
    }));
});

gulp.task('default', ['webserver']);