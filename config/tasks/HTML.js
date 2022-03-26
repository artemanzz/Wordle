import webpHtmlNosvg from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'
import pug from 'gulp-pug'

const settings = {
  pug: {
    pretty: true,
    verbose: true
  },
  versionNumber: {
    'value': '%DT%',
    'append': {
      'key': '_v',
      'cover': 0,
      'to': ['css', 'js']
    },
    'output': {
      'file': 'config/version.json'
    }
  },
  notify: {
    title: 'HTML',
    message: 'Error: <%= error.message %>'
  }
}

export function HTML() {
  const { path, mode } = app
  const { src, dest } = app.gulp
  const { plumber, notify, browsersync, _if } = app.plugins
  const plumberOnError = notify.onError(settings.notify)
  const output = mode.isBuild ? path._build : path._app

  return src(path.src.html + '*.pug')
    .pipe(plumber(plumberOnError))
    .pipe(pug(settings.pug))

    .pipe(_if(mode.isBuild, webpHtmlNosvg()))
    .pipe(_if(mode.isBuild, versionNumber(settings.versionNumber)))

    .pipe(dest(output))
    .pipe(browsersync.stream())
}
