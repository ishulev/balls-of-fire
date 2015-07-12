// grab our gulp packages
var gulp		= require('gulp'),
	path		= require('path');

var config = {
	publicDir: './app',
	sourceDir: './source'
};

gulp.task('data', function() {
	return gulp
		.src(path.join(config.sourceDir, 'data/*.json'))
		.pipe(gulp.dest(path.join(config.publicDir, 'data')));
});