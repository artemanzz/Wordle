import gulp from 'gulp'
import { path } from './config/path.js'
import { plugins } from './config/plugins.js'

global.app = {
  mode: {
    isDev: !process.argv.includes('--build'),
    isBuild: process.argv.includes('--build')
  },
  path, gulp, plugins
}

import { localServer } from './config/localServer.js'
import { cleanApp, cleanBuild } from './config/tasks/clean.js'
import { HTML } from './config/tasks/HTML.js'
import { CSS, cssLibs } from './config/tasks/CSS.js'
import { JS } from './config/tasks/JS.js'
import { IMG, SVG } from './config/tasks/IMG.js'
import { FONTS } from './config/tasks/FONTS.js'
import { RESOURCES } from './config/tasks/RESOURCES.js'
import { ZIP } from './config/tasks/ZIP.js'
import { FTP } from './config/tasks/FTP.js'

//*** *** ***  TASKS  *** *** ***
gulp.task('cleanApp', cleanApp)
gulp.task('cleanBuild', cleanBuild)
gulp.task('HTML', HTML)
gulp.task('cssLibs', cssLibs)
gulp.task('css', CSS)
gulp.task('js', JS)
gulp.task('img', IMG)
gulp.task('svg', SVG)
gulp.task('fonts', FONTS)
gulp.task('resources', RESOURCES)
gulp.task('zip', ZIP)
gulp.task('ftp', FTP)

function watcher() {
  gulp.watch([path.src.html + '**/*.pug'], HTML)
  gulp.watch([path.src.scss + '**/*.scss'], CSS)
  gulp.watch([path.src.scss + 'utils/libs/vendor/*'], cssLibs)
  gulp.watch([path.src.js + '**/*.js'], JS)
  gulp.watch([path.src.fonts + '**/*'], FONTS)
  gulp.watch([path.src.img + '**/*.{jpg,jpeg,png,gif,webp}',
  path.src.icons + '**/*'], IMG)
  gulp.watch([path.src.svg + '**/*.svg'], SVG)
  gulp.watch([path.src.resources + '**/*'], RESOURCES)
}

const startLocalServer = gulp.parallel(watcher, localServer)
const compile = gulp.series(HTML, cssLibs, CSS, JS,
  IMG, SVG, FONTS, RESOURCES)

const dev = gulp.series(cleanApp, compile, startLocalServer)
const build = gulp.series(cleanBuild, compile)
const deploy = gulp.series(build, ZIP, FTP)

gulp.task('default', dev)
gulp.task('build', build)
gulp.task('deploy', deploy)
