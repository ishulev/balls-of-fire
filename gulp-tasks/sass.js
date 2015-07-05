// grab our gulp packages
var concat		= require('gulp-concat'),
	gulp		= require('gulp'),
	sass		= require('gulp-sass'),
	sourcemaps	= require('gulp-sourcemaps');

var config = {
	bootstrapDir : './bower_components/bootstrap-sass',
	publicDir: './app',
	sourceDir: './source'
};

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