var gulp = require('gulp'),
	markdown = require('gulp-markdown'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	fileinclude = require('gulp-file-include');

gulp.task('default', ['html']);

gulp.task('md', function() {
	return gulp.src('resume.md')
        .pipe(markdown())
        .pipe(gulp.dest('.'));
});

gulp.task('html', ['md', 'css'], function(){
	return gulp.src('template.html')
	    .pipe(fileinclude('@@'))
	    .pipe(rename('index.html'))
	    .pipe(gulp.dest('.'));
});

gulp.task('css', function(){
	return gulp.src("sass/*")
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('watch', ['default'], function(){
	gulp.watch('resume.md', ['default']);
	gulp.watch('sass/*', ['css']);
});