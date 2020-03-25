var gulp = require("gulp");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();



function Sync(done) {
    browserSync.init({
        srever: {
            baseDir: "./"
        },
        host: '80.95.44.75',
        port: 9000,
        serveStatic: ["."],
    });
    gulp.watch('./*.html').on("change",browserSync.reload);
    gulp.watch('./scss/*.scss').on('change',css_style);
    done();
}
function css_style() {
    gulp.src("./scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
        errorLogToConsole: true,
        outputStyle: "compressed"
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(rename({suffix: ".min"}))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest("./css/"))
    .pipe(browserSync.stream());

    
}

function watchSass(){
    gulp.watch("./scss/**/*",css_style)
}

function print(done){
    console.log("Heil");
    done();
}

gulp.task(Sync);
gulp.task(css_style);
gulp.task("default",Sync);


//gulp.task(print);
//gulp.task(css_style);