import webp from 'gulp-webp'
import imagemin from 'gulp-imagemin'
import svgSprite from 'gulp-svg-sprite'

const settings = {
  notify: {
    title: 'IMAGES',
    message: 'Error: <%= error.message %>'
  },
  imagemin: {
    progressive: true,
    svgoPlugins: [{ removeViewBox: false }],
    interlaced: true,
    optimizationLevel: 3
  },
  svgSprite: {
    mode: {
      stack: {
        sprite: "../sprite.svg"
      }
    }
  }
}

export function IMG() {
  const { path, mode } = app
  const { src, dest } = app.gulp
  const { newer, plumber, notify, browsersync, _if } = app.plugins
  const plumberOnError = notify.onError(settings.notify)
  const output = mode.isBuild ? path.build.img : path.app.img

  return src([path.src.img + '**/*.{jpg,jpeg,png,gif,webp}',
  path.src.icons + '**/*'])
    .pipe(plumber(plumberOnError))
    .pipe(newer(output))

    .pipe(_if(mode.isBuild, webp()))
    .pipe(_if(mode.isBuild, dest(output)))
    .pipe(_if(mode.isBuild, src([path.src.img + '**/*.{jpg,jpeg,png,gif,webp}',
    path.src.icons + '**/*'])))
    .pipe(_if(mode.isBuild, newer(output)))
    .pipe(_if(mode.isBuild, imagemin(settings.imagemin)))

    .pipe(dest(output))
    .pipe(browsersync.stream())
}

export function SVG() {
  const { path, mode } = app
  const { src, dest } = app.gulp
  const { newer, plumber, notify, browsersync } = app.plugins
  const plumberOnError = notify.onError(settings.notify)
  const output = mode.isBuild ? path.build.img : path.app.img

  return src(path.src.svg + '**/*.svg')
    .pipe(plumber(plumberOnError))
    .pipe(newer(output))
    .pipe(svgSprite(settings.svgSprite))
    .pipe(dest(output))
    .pipe(browsersync.stream())
}
