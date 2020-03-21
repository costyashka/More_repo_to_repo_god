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
        port: 3000,
        serveStatic: [".","./css"]
    });

    done();
}
function css_style(done) {
    gulp.src("./scss/**/*.scss")
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
    .pipe(gulp.dest("./css/"));

    done();
}

function watchSass(){
    gulp.watch("./scss/**/*",css_style)
}

function print(done){
    console.log("Heil");
    done();
}

gulp.task("default",gulp.series(print,watchSass));
gulp.task(Sync);
//gulp.task(print);
//gulp.task(css_style);