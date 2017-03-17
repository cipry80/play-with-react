'use strict'

const gulp = require('gulp');
const connect = require('gulp-connect');// runs a local dev server
const open = require('gulp-open');//open a url in a web browser
const browserify = require('browserify'); // bundle JS
const reactify = require('reactify'); // TRANSFORM JSX TO JS
const source = require('vinyl-source-stream');
const concat = require('gulp-concat');//cancatenates file
const lint = require('gulp-eslint');//lint file
const config = {
    port: 3001,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.css'
        ],
        dist: './dist',
        mainJs: './src/main.js'
    }
}
//start a local dev server

gulp.task('connect', () =>{
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], () =>{
    gulp.src('dist/index.html')
        .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html',  ()=>{
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js',  ()=>{
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload())
});

gulp.task('css',  ()=>{
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(connect.reload());
});

gulp.task('lint', ()=> {
    return gulp.src(config.paths.js)
                    .pipe(lint({config: 'eslint.config.json'}))
                    .pipe(lint.format());
})

gulp.task('watch', ()=> {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js']);
});

gulp.task('default', ['html', 'js', 'css', 'open', 'watch']);
