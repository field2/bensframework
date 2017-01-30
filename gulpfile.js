var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var sassOptions = { outputStyle: 'expanded' };






var config = {
	sass: {
		src: './scss/*.{scss,sass}',
		dest: './build/css',
		opts: {

		}
	},
	injectChanges: true,
	server: {
		baseDir: './build/'
	}



};


// ---------------------------------------------- Gulp Tasks
gulp.task('sass', function() {
	return gulp.src(config.sass.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(config.sass.dest))
   .pipe(browserSync.reload({ stream: true}));

});

gulp.task('browserSync', function() {
	browserSync.init(config);
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


// ------------------------------------ Gulp Testing Message
gulp.task('message', function() {
	console.log('It works!!');
});

// ---------------------------------------------- Gulp Watch
gulp.task('watch:styles', function() {
	gulp.watch(config.sass.src, gulp.series('sass'));
});

gulp.task('watch:nunjucks', function() {
	gulp.watch('./**/*.html', gulp.series('nunjucks'));
});

gulp.task('watch', gulp.series('sass', 'nunjucks',
	gulp.parallel('watch:styles'),
	gulp.parallel('watch:nunjucks')

));


// -------------------------------------------- Default task
gulp.task('default', gulp.series(
	gulp.parallel(
	'sass','nunjucks'),
		gulp.parallel(
	'nunjucks'),
	gulp.parallel('watch','browserSync')
));

