import del from 'del'

export function cleanApp() {
  return del(app.path._app)
}

export function cleanBuild() {
  return del(app.path._build)
}
