import assert from 'assert'
import concat from 'gulp-concat'
import fs from 'fs'
import gulp from 'gulp'

const srcPath = __dirname + '/node_modules/snapsvg/src';

/* Extracted from snapsvg's gruntfile. */
const expectedSourceFiles = [
  "mina.js",
  "svg.js",
  "element.js",
  "animation.js",
  "matrix.js",
  "attr.js",
  "class.js",
  "attradd.js",
  "paper.js",
  "path.js",
  "set.js",
  "equal.js",
  "mouse.js",
  "filter.js",
  "align.js",
  "colors.js"
]
const excludedSourceFiles = [
  "amd-banner.js",
  "amd-footer.js",
  "copy.js"
]

gulp.task('default', _ => {
  /* Start by confirming the upstream source files haven't changed */
  const sourceFiles = fs.readdirSync(srcPath);
  assert.deepEqual(sourceFiles.sort(), [...expectedSourceFiles, ...excludedSourceFiles].sort(), "SnapSVG upstream has different files to what we expect. They must have updated it! This will need to be resolved manually.")

  gulp.src([
    'cjs-head.js',
    ...expectedSourceFiles.map(f => `${srcPath}/${f}`),
    'cjs-foot.js'
  ]).pipe(concat('snap.svg-cjs.js'))
    .pipe(gulp.dest('dist'))
})
