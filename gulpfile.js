var gulp = require('gulp');
var markdown = require('gulp-markdown');
var fileinclude = require('gulp-file-include');

gulp.task('default', ['md', 'html']);

gulp.task('md', function() {
	return gulp.src('resume.md')
        .pipe(markdown())
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function(){
	return gulp.src('index.html')
	    .pipe(fileinclude('@@'))
	    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['default'], function(){
	gulp.watch('resume.md', ['default']);
});