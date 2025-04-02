const gulp = require("gulp");
const ts = require("gulp-typescript");

// Create a TypeScript project using tsconfig.json
const tsProject = ts.createProject("tsconfig.json");

// Define the "scripts" task to compile TypeScript files
gulp.task("scripts", function () {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"));
});

// Default task: compile scripts
gulp.task("default", gulp.series("scripts"));