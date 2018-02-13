var gulp = require('gulp'),
	markdown = require('gulp-markdown'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	wrap = require('gulp-wrap')
    exec = require('gulp-exec')
    frontMatter = require('gulp-front-matter');

gulp.task('default', ['html', 'index', 'pdf']);

gulp.task('html', ['css'], function(){
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

gulp.task('index', ['html'], function(){
    return gulp.src('resume.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('.'));
});

gulp.task('css', function(){
	return gulp.src("sass/*")
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('watch', ['default'], function(){
	gulp.watch('resume*.md', ['default']);
	gulp.watch('sass/*', ['css']);
});

gulp.task('pdf', ['html'], function(){
    return gulp.src("resume*.html")
        .pipe(exec("wkhtmltopdf <%= file.path %> <%= file.path.replace('.html','') %>.pdf"))
        .pipe(exec.reporter());
});