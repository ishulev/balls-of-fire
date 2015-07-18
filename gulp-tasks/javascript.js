// grab our gulp packages
var concat		= require('gulp-concat'),
	gulp		= require('gulp'),
	gutil		= require('gulp-util'),
	jshint		= require('gulp-jshint'),
	path		= require('path'),
	sourcemaps	= require('gulp-sourcemaps'),
	uglify		= require('gulp-uglify');

var config = {
	angularDir: './bower_components/angular',
	angularSanitizeDir: './bower_components/angular-sanitize',
	publicDir: './app',
	sourceDir: './source'
};

gulp
	.task('jshint', function() {
		return gulp
			.src(path.join(config.sourceDir, 'javascript/**/*.js'))
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'));
	})
	.task('js-build', function() {
		return gulp
			.src([
				path.join(config.angularDir, 'angular.js'),
				path.join(config.angularSanitizeDir, 'angular-sanitize.js'),
				path.join(config.sourceDir, 'javascript/core.js'),
				path.join(config.sourceDir, 'javascript/**/*.js')])
			.pipe(sourcemaps.init())
			.pipe(concat('scripts.js'))
			//only uglify if gulp is ran with '--type production'
			.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(path.join(config.publicDir, 'javascript')));
	});