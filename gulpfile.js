var gulp = require('gulp');
var mincss = require('gulp-clean-css');
var sass = require('gulp-sass');
var minjs = require('gulp-uglify');
var server = require('gulp-webserver')
var fs = require('fs');
var path = require('path');
var url = require('url');
gulp.task('devCss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(mincss())

    .pipe(gulp.dest('./src/css'))
})
gulp.task('watch', function() {
        return gulp.watch('./src/scss/*.scss', gulp.series('devCss'))
    })
    //起服务
gulp.task('server', function() {
        return gulp.src('src')
            .pipe(server({
                port: 8090,
                open: true,
                middleware: function(req, res, next) {
                    var pathname = url.parse(req.url).pathname
                    if (pathname === '/favicon.ico') {
                        res.end('');
                        return;
                    }
                    var pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }))
    })
    //整合任务
gulp.task('dev', gulp.series('devCss', 'server', 'watch'))