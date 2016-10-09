var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    nunjucksRender = require('gulp-nunjucks-render'),
    svgSprite = require("gulp-svg-sprites"),
    browserSync = require('browser-sync').create();


gulp.task('serve', ['nunjucks','sass'], function() {
    browserSync.init({
       server: {
            baseDir: "./build"
        }
    });
    gulp.watch('**/*.scss', ['sass']);
    gulp.watch("build/*.html").on('change', browserSync.reload);

});


gulp.task('sass', function() {
    gulp.src('scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
});



gulp.task('nunjucks', function() {
    return gulp.src('pages/*.html')
        .pipe(nunjucksRender({
            path: ['templates']
        }))
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());

});

/* extra tasks, only run when needed */
gulp.task('imagemin', function() {
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
});

gulp.task('sprites', function() {
    return gulp.src('source/svg/*.svg')
        .pipe(svgSprite({
            cssFile: 'scss/_icons.scss'
        }))
        .pipe(gulp.dest("build/images/sprite.svg"));
});


/* default task, runs with just gulp */
gulp.task('default', ['serve']);
