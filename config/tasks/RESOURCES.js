const settings = {
  notify: {
    title: 'RESOURCES',
    message: 'Error: <%= error.message %>'
  }
}

export function RESOURCES() {
  const { path, mode } = app
  const { src, dest } = app.gulp
  const { plumber, notify, browsersync } = app.plugins
  const plumberOnError = notify.onError(settings.notify)
  const output = mode.isBuild ? path._build : path._app

  return src(path.src.resources + '**/*')
    .pipe(plumber(plumberOnError))
    .pipe(dest(output))
    .pipe(browsersync.stream())
}
