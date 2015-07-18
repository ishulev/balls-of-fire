// grab our gulp packages
var gulp		= require('gulp'),
	path		= require('path'),
	imagemin	= require('gulp-imagemin');

var config = {
	publicDir: './app',
	sourceDir: './source'
};

gulp.task('images', function() {
	return gulp
		.src(path.join(config.sourceDir, 'images/*'))
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest(path.join(config.publicDir, 'images')));
});