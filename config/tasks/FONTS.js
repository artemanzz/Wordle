import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2'

const settings = {
  notify: {
    title: 'FONTS',
    message: 'Error: <%= error.message %>'
  }
}

export function FONTS() {
  const { path, mode } = app
  const { src, dest } = app.gulp
  const { plumber, notify, browsersync } = app.plugins
  const plumberOnError = notify.onError(settings.notify)
  const output = mode.isBuild ? path.build.fonts : path.app.fonts

  return src(path.src.fonts + '*.ttf')
    .pipe(plumber(plumberOnError))
    .pipe(fonter({ formats: ['woff'] }))
    .pipe(dest(output))
    .pipe(src(path.src.fonts + '*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest(output))
    .pipe(browsersync.stream())
}
