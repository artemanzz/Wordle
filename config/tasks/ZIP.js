import del from 'del'
import zipPlugin from 'gulp-zip'

const settings = {
  notify: {
    title: 'ZIP',
    message: 'Error: <%= error.message %>'
  }
}

export function ZIP() {
  const { path } = app
  const { src, dest } = app.gulp
  const { plumber, notify } = app.plugins
  const plumberOnError = notify.onError(settings.notify)

  del(`./${path._root}.zip`)

  return src(path._build + '**/*')
    .pipe(plumber(plumberOnError))
    .pipe(zipPlugin(`${path._root}.zip`))
    .pipe(dest('./'))
}
