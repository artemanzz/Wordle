import replace from 'gulp-replace'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import browsersync from 'browser-sync'
import sourcemaps from 'gulp-sourcemaps'
import newer from 'gulp-newer'
import _if from 'gulp-if'

export const plugins = {
  _if,
  newer,
  replace,
  plumber,
  notify,
  sourcemaps,
  browsersync
}
