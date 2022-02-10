const gulp = require('gulp');
const markdown = require('gulp-markdown');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const wrap = require('gulp-wrap');
const exec = require('gulp-exec');
const frontMatter = require('gulp-front-matter');

gulp.task('css', () =>
    gulp.src("sass/*")
        .pipe(sass())
        .pipe(gulp.dest('css'))
);

gulp.task('html', () =>
    gulp.src('resume.md')
        .pipe(frontMatter({
            property: 'matter',
            remove: true
        }))
        .pipe(markdown())
        .pipe(wrap({ src: 'template.html' }))
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest('.'))
);

gulp.task('index', () =>
    gulp.src('resume.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('.'))
);

gulp.task('pdf', () =>
    gulp.src("resume*.html")
        .pipe(exec((file) => `wkhtmltopdf --no-outline --enable-local-file-access "${file.path}" "${file.path.replace('.html', '.pdf')}"`))
        .pipe(exec.reporter())
);

gulp.task('default', gulp.series('css', 'html', 'index', 'pdf'));

gulp.task('watch', gulp.series('default', () => {
    gulp.watch('resume*.md', gulp.task('default'));
    gulp.watch('sass/*', gulp.task('default'));
    gulp.watch('template.html', gulp.task('default'));
}));