// grab our gulp packages
var gulp	= require('gulp'),
	fc2json	= require('gulp-file-contents-to-json'),
	jade	= require('gulp-jade'),
	path	= require('path');

var config = {
	publicDir: './app',
	sourceDir: './source'
};

gulp.task('data', function() {
	return gulp
		.src(path.join(config.sourceDir, 'jade', 'content','**/*'))
		.pipe(jade())
		.pipe(fc2json('content.json'))
		.pipe(gulp.dest(path.join(config.publicDir, 'data')));
});