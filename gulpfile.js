let gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  rename = require("gulp-rename"),
  del = require("del"),
  sourcemaps = require("gulp-sourcemaps"),
  notify = require("gulp-notify"),
  plumber = require("gulp-plumber"),
  // pug = require("gulp-pug"),
  sour;
autoprefixer = require("gulp-autoprefixer");

gulp.task("clean", async function () {
  del.sync("build");
});

gulp.task("copy:html", function (callback) {
  return gulp.src("./src/index.html").pipe(gulp.dest("./build/"));
  callback();
});

gulp.task("scss", function (callback) {
  return gulp
    .src("./src/scss/style.scss")
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "StylesSCSS",
            sound: false,
            message: err.message,
          };
        }),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 4 versions"],
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./build/css/"))
    .pipe(browserSync.reload({ stream: true }));

  callback();
});

gulp.task("css", function () {
  return gulp
    .src([
      "node_modules/normalize.css/normalize.css",
      "node_modules/slick-carousel/slick/slick.css",
    ])
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "Styles",
            sound: false,
            message: err.message,
          };
        }),
      })
    )
    .pipe(concat("_libs.scss"))
    .pipe(gulp.dest("src/scss"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("html", function () {
  return gulp.src("src/*.html").pipe(browserSync.reload({ stream: true }));
});

gulp.task("script", function () {
  return gulp.src("src/js/*.js").pipe(browserSync.reload({ stream: true }));
});

gulp.task("js", function () {
  return gulp
    .src(["node_modules/slick-carousel/slick/slick.js"])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "./build/",
    },
  });
});

gulp.task("copy:img", function (callback) {
  return gulp.src("./src/img/**/*.*").pipe(gulp.dest("./build/img/"));
  callback();
});

gulp.task("copy:js", function (callback) {
  return gulp.src("./src/js/**/*.*").pipe(gulp.dest("./build/js/"));
  callback();
});

gulp.task("watch", function () {
  gulp.watch("src/scss/**/*.scss", gulp.parallel("scss"));
  gulp.watch("build/*.html", gulp.parallel("html"));
  gulp.watch("src/js/*.js", gulp.parallel("script"));
  // gulp.watch("src/pug/**/*.pug", gulp.parallel("pug"));
  gulp.watch("src/img/**/*.*", gulp.parallel("copy:img"));
  gulp.watch("src/js/**/*.*", gulp.parallel("copy:js"));
  gulp.watch("src/index.html", gulp.parallel("copy:html"));
});

gulp.task("build", gulp.series("clean"));

// gulp.task(
//   "default",
//   gulp.parallel("css", "scss", "js", "browser-sync", "watch", "pug")
// );

gulp.task(
  "default",
  gulp.series(
    "build",
    "css",
    "scss",
    "js",
    "copy:html",
    "copy:img",
    "copy:js",
    gulp.parallel("browser-sync", "watch")
  )
);
