var gulp = require('gulp'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	livereload = require('gulp-livereload'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin');


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



gulp.task('default', ['watch', 'imagemin']);