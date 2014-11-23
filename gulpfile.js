var gulp = require('gulp'),
	markdown = require('gulp-markdown'),
	sass = require('gulp-sass'),
	fileinclude = require('gulp-file-include');

gulp.task('default', ['html']);

gulp.task('md', function() {
	return gulp.src('resume.md')
        .pipe(markdown())
        .pipe(gulp.dest('dist'));
});

gulp.task('html', ['md', 'img', 'css'], function(){
	return gulp.src('index.html')
	    .pipe(fileinclude('@@'))
	    .pipe(gulp.dest('dist'));
});

gulp.task('css', function(){
	return gulp.src("sass/*")
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('img', function(){
	return gulp.src('img/*')
		.pipe(gulp.dest('dist/img'));
})

gulp.task('watch', ['default'], function(){
	gulp.watch('resume.md', ['default']);
	gulp.watch('sass/*', ['css']);
	gulp.watch('img/*', ['img']);
});