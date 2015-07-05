// grab our gulp packages
var concat		= require('gulp-concat'),
	gulp		= require('gulp'),
	jade		= require('gulp-jade'),
	sourcemaps	= require('gulp-sourcemaps');

var config = {
	publicDir: './app',
	sourceDir: './source'
};

gulp.task('html-build', function() {
	return gulp
		.src(config.sourceDir + '/jade/**/*.jade')
		.pipe(jade())
		.pipe(concat('index.html'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.publicDir));
});