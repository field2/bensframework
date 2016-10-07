var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    // handlebars = require('gulp-handlebars'),
    svgSprite = require("gulp-svg-sprites");


gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'))
        .pipe(livereload());
});


gulp.task('imagemin', function() {
    gulp.src('assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('images'))
});


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('**/*.php').on('change', livereload.changed);
    gulp.watch('**/*.html').on('change', livereload.changed);

});

gulp.task('sprites', function() {
    return gulp.src('assets/svg/*.svg')
        .pipe(svgSprite({
            cssFile: 'scss/_icons.scss' //doesn't work. I want to put _icons.scss in the scss folder so I can include it in my main scss file
        }))
        .pipe(gulp.dest("./"));
});



gulp.task('default', ['watch', 'imagemin', 'sprites']);