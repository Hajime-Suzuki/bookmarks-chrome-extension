const run = require('gulp-run')
const gulp = require('gulp')
const { watch } = gulp
const buildReact = () => {
  return run('yarn build').exec()
}

gulp.task('default', buildReact)

watch(['src/**/*.tsx', 'src/**/*.ts'], buildReact)
