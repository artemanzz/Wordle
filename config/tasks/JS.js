import webpack from 'webpack-stream'

const settings = {
  notify: {
    title: 'JS',
    message: 'Error: <%= error.message %>'
  },
  webpack_dev: {
    mode: 'development',
    output: {
      filename: 'app.min.js',
    }
  },
  webpack_build: {
    entry: ["regenerator-runtime/runtime.js", "./src/js/app.js"],
    mode: 'production',
    output: {
      filename: 'app.min.js',
    },
    module: {
      rules: [{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }]
    },
  }
}

export function JS() {
  const { path, mode } = app
  const { src, dest } = app.gulp
  const { plumber, notify, sourcemaps, browsersync, _if } = app.plugins
  const plumberOnError = notify.onError(settings.notify)
  const output = mode.isBuild ? path.build.js : path.app.js

  return src(path.src.js + 'app.js', { sourcemaps: mode.isDev })
    .pipe(_if(mode.isDev, sourcemaps.init()))
    .pipe(plumber(plumberOnError))
    .pipe(webpack(mode.isBuild ? settings.webpack_build : settings.webpack_dev))
    .pipe(_if(mode.isDev, sourcemaps.write('.')))
    .pipe(dest(output))
    .pipe(browsersync.stream())
}
