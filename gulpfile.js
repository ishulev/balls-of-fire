// grab our gulp packages
var gulp		= require('gulp'),
	//Loads the individual gulp tasks from the gulp-tasks folder
	//Documentation: http://macr.ae/article/splitting-gulpfile-multiple-files.html
	requireDir	= require('require-dir')('./gulp-tasks'),
	server		= require('gulp-express');

var config = {
	publicDir: './app',
	sourceDir: './source'
};

gulp.task('server-start', function() {
	server.run();
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	gulp.watch(config.sourceDir + '/javascript/**/*.js', ['jshint', 'js-build']);
	gulp.watch(config.sourceDir + '/scss/**/*.scss', ['css-build']);
	gulp.watch(config.sourceDir + '/jade/**/*.jade', ['html-build']);
	gulp.watch(config.publicDir + '/**/*', server.notify);
});

// create a default task and just log a message
gulp.task('default', ['html-build', 'css-build', 'js-build', 'images', 'server-start', 'watch']);