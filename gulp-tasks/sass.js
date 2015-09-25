// grab our gulp packages
var concat		= require('gulp-concat'),
	gulp		= require('gulp'),
	gutil		= require('gulp-util'),
	path		= require('path'),
	sass		= require('gulp-sass'),
	sourcemaps	= require('gulp-sourcemaps'),
	uglifycss	= require('gulp-uglifycss');

var config = {
	bootstrapDir : './bower_components/bootstrap-sass',
	publicDir: './app',
	sourceDir: './source'
};

gulp.task('css-build', function() {
	return gulp
		.src([
			path.join(config.sourceDir, 'scss/main.scss'),
			path.join(config.sourceDir, 'scss/*/*.scss')])
		.pipe(sass({
				//include paths only references the item for an @import, so such an @import needs
				//to be present on the main file, declared above or it will not compile anything
				//Documentation: https://github.com/sass/node-sass#includepaths
				includePaths: [path.join(config.bootstrapDir, 'assets/stylesheets')],
			}).on('error', sass.logError))
		//only uglify if gulp is ran with '--type production'
		.pipe(gutil.env.type === 'production' ? uglifycss() : gutil.noop())
		.pipe(concat('styles.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.join(config.publicDir, 'css')));
});