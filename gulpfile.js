// grab our gulp packages
var concat		= require('gulp-concat'),
	gulp		= require('gulp'),
	gutil		= require('gulp-util'),
	jade		= require('gulp-jade'),
	jshint		= require('gulp-jshint'),
	sass		= require('gulp-sass'),
	server		= require('gulp-express'),
	sourcemaps	= require('gulp-sourcemaps');

var config = {
	bootstrapDir : './bower_components/bootstrap-sass',
	publicDir: './app',
	sourceDir: './source'
};

gulp.task('server-start', function() {
	server.run();
});

gulp.task('jshint', function() {
	return gulp
		.src(config.sourceDir + '/javascript/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('html-build', function() {
	return gulp
		.src(config.sourceDir + '/jade/**/*.jade')
		.pipe(jade())
		.pipe(concat('index.html'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.publicDir));
});

gulp.task('css-build', function() {
	return gulp
		.src(config.sourceDir + '/scss/**/*.scss')
		.pipe(sass({
				//include paths only references the item for an @import, so such an @import needs
				//to be present on the main file, declared above or it will not compile anything
				//Documentation: https://github.com/sass/node-sass#includepaths
				includePaths: [config.bootstrapDir + '/assets/stylesheets'],
			}).on('error', sass.logError))
		.pipe(concat('styles.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('js-build', function() {
	return gulp
		.src(config.sourceDir + '/javascript/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		//only uglify if gulp is ran with '--type production'
		.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.publicDir + '/javascript'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	gulp.watch(config.sourceDir + '/javascript/**/*.js', ['jshint', 'js-build']);
	gulp.watch(config.sourceDir + '/scss/**/*.scss', ['css-build']);
	gulp.watch(config.sourceDir + '/jade/**/*.jade', ['html-build']);
	gulp.watch(config.publicDir + '/**/*', server.notify);
});

// create a default task and just log a message
gulp.task('default', ['html-build', 'css-build', 'js-build', 'server-start', 'watch']);