/**
 *  Usage:
 *      Once per computer: 
 *             npm install -g gulp
 *
 *      Once per project: 
 *             cd gulp-template
 *             npm install
 *             gulp
 *
 */

// include gulp and all plugins
var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    notify       = require('gulp-notify'),
    connect      = require('gulp-connect'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    pixrem       = require('gulp-pixrem');


// setup some variables with paths
var root = "./";

var css = {
	src: root + "scss/index.scss",
	watch: root + "scss/**/*.scss",
	dest: root + "css/"
}


// create server with livereload
// chrome extension: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en
gulp.task('connect', function(){
	connect.server({
		livereload: true,
		root: root
	});
});

// compile sass with all kinds of plugins
gulp.task('css', function(){

	return gulp.src(css.src)
		.pipe(plumber({errorHandler: onError}))
		.pipe(sass())
		.pipe(pixrem())
		.pipe(autoprefixer())
		.pipe(gulp.dest(css.dest))
		.pipe(connect.reload()); // after everything is done, reload
});

// error handler that is passed to gulp-plumber
var onError = function(err) {
    notify.onError({
        title:    "<%= error.plugin %>",
        message:  "<%= error.message %>",
        sound:    "Beep"
    })(err);

    this.emit('end');
};


// create watch task
gulp.task('watch', function(){
	gulp.watch(css.watch, ['css']);
});	


// default task (run when you run 'gulp')
gulp.task('default', ['connect', 'watch', 'css']);

