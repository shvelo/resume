var gulp = require('gulp'),
    markdown = require('gulp-markdown'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    wrap = require('gulp-wrap'),
    exec = require('gulp-exec'),
    frontMatter = require('gulp-front-matter');

gulp.task('css', function () {
    return gulp.src("sass/*")
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('html', function () {
    return gulp.src('resume.md')
        .pipe(frontMatter({
            property: 'matter',
            remove: true
        }))
        .pipe(markdown())
        .pipe(wrap({ src: 'template.html' }))
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest('.'));
});

gulp.task('index', function () {
    return gulp.src('resume.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('.'));
});

gulp.task('pdf', function () {
    return gulp.src("resume*.html")
        .pipe(exec("wkhtmltopdf --enable-local-file-access <%= file.path %> <%= file.path.replace('.html','') %>.pdf"))
        .pipe(exec.reporter());
});

gulp.task('default', gulp.series('css', 'html', 'index', 'pdf'));

gulp.task('watch', gulp.series('default', function () {
    gulp.watch('resume*.md', gulp.task('default'));
    gulp.watch('sass/*', gulp.task('default'));
    gulp.watch('template.html', gulp.task('default'));
}));