var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    nunjucksRender = require('gulp-nunjucks-render'),
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
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('images'))
});


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('scss/*.scss', ['sass']);
        gulp.watch('**/*.html', ['nunjucks']);
    gulp.watch('**/*.php').on('change', livereload.changed);
    gulp.watch('**/*.html').on('change', livereload.changed);


});

gulp.task('sprites', function() {
    return gulp.src('source/svg/*.svg')
        .pipe(svgSprite({
            cssFile: 'scss/_icons.scss'
        }))
        .pipe(gulp.dest("images/sprite.svg"));
});

gulp.task('nunjucks', function() {
  // nunjucks stuff here
   // Gets .html and .nunjucks files in pages
  return gulp.src('pages/*.+(html)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('build'))

});


gulp.task('default', ['watch', 'imagemin', 'sprites']);