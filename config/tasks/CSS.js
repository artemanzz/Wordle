import del from 'del'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import postcss from 'gulp-postcss'
import rename from 'gulp-rename'
import concat from 'gulp-concat'
import cleanCss from 'gulp-clean-css'
import webpcss from 'gulp-webpcss'
import autoprefixer from 'gulp-autoprefixer'
import groupCssMediaQueries from 'gulp-group-css-media-queries'

const sass = gulpSass(dartSass)

const settings = {
  sass: {
    outputStyle: 'expanded',
  },
  notify: {
    title: 'SASS',
    message: 'Error: <%= error.message %>',
  },
  rename: {
    ext: {
      basename: 'style',
      extname: '.css',
    },
    min: {
      basename: 'style',
      suffix: '.min',
      extname: '.css',
    },
  },
  webpcss: {
    webpClass: '.webp',
    noWebpClass: '.no-webp',
  },
  autoprefixer: {
    grid: true,
    overrideBrowserslist: ['last 3 versions'],
    cascade: true,
  },
}

export function cssLibs() {
  const { path } = app
  const { src, dest } = app.gulp
  const { plumber, notify, browsersync } = app.plugins
  const plumberOnError = notify.onError(settings.notify)

  del(path.src.scss + 'utils/libs/_libs.scss')

  return src(path.src.scss + 'utils/libs/vendor/*')
    .pipe(plumber(plumberOnError))
    .pipe(concat('_libs.scss'))
    .pipe(dest(path.src.scss + 'utils/libs'))
    .pipe(browsersync.stream())
}

export function CSS() {
  const { path, mode } = app
  const { src, dest } = app.gulp
  const { plumber, notify, sourcemaps, browsersync, _if } = app.plugins
  const plumberOnError = notify.onError(settings.notify)
  const output = mode.isBuild ? path.build.css : path.app.css

  return src(path.src.scss + 'index.scss', { sourcemaps: mode.isDev })
    .pipe(plumber(plumberOnError))
    .pipe(sass(settings.sass))
    // .pipe(postcss([]))

    .pipe(_if(mode.isDev, sourcemaps.init()))
    .pipe(_if(mode.isBuild, groupCssMediaQueries()))
    .pipe(_if(mode.isBuild, webpcss(settings.webpcss)))
    .pipe(_if(mode.isBuild, autoprefixer(settings.autoprefixer)))

    .pipe(_if(mode.isDev, rename(settings.rename.ext)))
    .pipe(_if(mode.isDev, dest(output)))
    .pipe(_if(mode.isBuild, cleanCss()))

    .pipe(rename(settings.rename.min))
    .pipe(_if(mode.isDev, sourcemaps.write('.')))
    .pipe(dest(output))
    .pipe(browsersync.stream())
}
