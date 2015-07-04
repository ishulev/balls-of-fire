// grab our gulp packages
var concat 		= require('gulp-concat'),
	gulp 		= require('gulp'),
	gutil 		= require('gulp-util'),
	jade 		= require('gulp-jade'),
	jshint 		= require('gulp-jshint'),
	sass 		= require('gulp-sass'),
	server		= require('gulp-express'),
	sourcemaps 	= require('gulp-sourcemaps');

gulp.task('server-start', function() {
	server.run();
});

gulp.task('jshint', function() {
	return gulp
		.src('source/javascript/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('html-build', function() {
	return gulp
		.src('source/jade/**/*.jade')
		.pipe(jade())
		.pipe(concat('index.html'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app'));
});

gulp.task('css-build', function() {
	return gulp
		.src('source/scss/**/*.scss')
		.pipe(sass())
		.pipe(concat('styles.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/css'));
});

gulp.task('js-build', function() {
	return gulp
		.src('source/javascript/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		//only uglify if gulp is ran with '--type production'
		.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/javascript'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	gulp.watch('source/javascript/**/*.js', ['jshint', 'js-build']);
	gulp.watch('source/scss/**/*.scss', ['css-build']);
	gulp.watch('source/jade/**/*.jade', ['html-build']);
	gulp.watch('app/**/*', server.notify);
});

// create a default task and just log a message
gulp.task('default', ['html-build', 'css-build', 'js-build', 'server-start', 'watch']);