export function localServer() {
  const { browsersync } = app.plugins
  const { path } = app

  browsersync.init({
    server: {
      baseDir: path._app
    },
    tunnel: 'localhost',
    notify: false,
    port: 3000
  })
}