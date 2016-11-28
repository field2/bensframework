<<<<<<< Updated upstream
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var svgSprite = require("gulp-svg-sprites");
var sassOptions = { outputStyle: 'expanded' };
=======
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    svgSprite = require("gulp-svg-sprites");
//     var     handlebars = require('gulp-handlebars');
//     var wrap = require('gulp-wrap');
// var declare = require('gulp-declare');
// var concat = require('gulp-concat');
>>>>>>> Stashed changes

gulp.task('watch', ['sass', 'nunjucks'], function() {
browserSync.init({
        server: {
            baseDir: './build'
        }
    });
    gulp.watch('./scss/*.scss', ['sass']).on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    gulp.watch('./pages/*.html', ['nunjucks']);

});

gulp.task('templates', function(){
  gulp.src('templates/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'MyApp.templates',
      noRedeclare: true, // Avoid duplicate declarations 
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('js/'));
});




gulp.task('bs-reload', function () {
    browserSync.reload();
});



gulp.task('sass', function() {
   return gulp.src('scss/*.scss')
        // .pipe(sourcemaps.init())
        // .pipe(plumber())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/css'))
         .pipe(browserSync.reload({ stream: true}));
});


gulp.task('nunjucks', function() {
    nunjucksRender.nunjucks.configure(['templates']);
    return gulp.src('pages/*.html')
      .pipe(nunjucksRender({
            path: ['templates']
        }))
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({ stream: true}));

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
            cssFile: 'scss/_icons.scss',
        }))
        .pipe(gulp.dest("build"));
});


<<<<<<< Updated upstream
/* default task, runs with just gulp */
gulp.task('default', ['watch']);
=======

gulp.task('default', ['watch', 'imagemin', 'sprites', 'templates']);
>>>>>>> Stashed changes
