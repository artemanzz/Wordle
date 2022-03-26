import { configFTP } from '../ftp.js'
import vinylFTP from 'vinyl-ftp'
import util from 'gulp-util'

const settings = {
  notify: {
    title: 'FTP',
    message: 'Error: <%= error.message %>'
  }
}

export function FTP() {
  const { path } = app
  const { src } = app.gulp
  const { plumber, notify } = app.plugins
  const plumberOnError = notify.onError(settings.notify)

  configFTP.log = util.log
  const ftpConnect = vinylFTP.create(configFTP)

  return src(path._build + '**/*')
    .pipe(plumber(plumberOnError))
    .pipe(ftpConnect.dest(`/${path._ftp}/${path._root}`))
}
