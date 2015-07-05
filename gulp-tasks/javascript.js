// grab our gulp packages
var concat		= require('gulp-concat'),
	gulp		= require('gulp'),
	gutil		= require('gulp-util'),
	jshint		= require('gulp-jshint'),
	sourcemaps	= require('gulp-sourcemaps'),
	uglify		= require('gulp-uglify');

var config = {
	angularDir: './bower_components/angular',
	publicDir: './app',
	sourceDir: './source'
};

gulp
	.task('jshint', function() {
		return gulp
			.src(config.sourceDir + '/javascript/**/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'));
	})
	.task('js-build', function() {
		return gulp
			.src([
				config.angularDir + '/angular.js',
				config.sourceDir + '/javascript/core.js',
				config.sourceDir + '/javascript/**/*.js'])
			.pipe(sourcemaps.init())
			.pipe(concat('scripts.js'))
			//only uglify if gulp is ran with '--type production'
			.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(config.publicDir + '/javascript'));
	});