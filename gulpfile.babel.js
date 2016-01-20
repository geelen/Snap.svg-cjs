import gulp from 'gulp'
import concat from 'gulp-concat'
import gruntfile from 'snapsvg/Gruntfile'

gulp.task('default', _ => {
  let gruntConfig
  const mockGrunt = {
    file: { readJSON: _ => ({}), read: _ => '' },
    loadNpmTasks() {},
    registerTask() {},
    template: { today() {} },
    initConfig: config => gruntConfig = config
  }
  if (!gruntConfig || !gruntConfig.concat || !gruntConfig.concat.target || !gruntConfig.concat.target.src)
    throw new Error("Gruntfile had unexpected structure!")
  gruntfile(mockGrunt)
  console.log(gruntConfig)
})
