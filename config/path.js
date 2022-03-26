import * as node_Path from 'path'

const _root = node_Path.basename(node_Path.resolve())

const _src = 'src/'
const _app = 'app/'
const _build = 'build/'
const _config = 'config/'
const _ftp = ''

export const path = {
  src: {
    html: _src + 'html/',
    scss: _src + 'scss/',
    js: _src + 'js/',
    fonts: _src + 'fonts/',
    img: _src + 'img/',
    icons: _src + 'img/icons/',
    svg: _src + 'svg/',
    resources: _src + 'resources/',
  },
  app: {
    css: _app + 'css/',
    js: _app + 'js/',
    fonts: _app + 'fonts/',
    img: _app + 'img/'
  },
  build: {
    css: _build + 'css/',
    js: _build + 'js/',
    fonts: _build + 'fonts/',
    img: _build + 'img/'
  },
  config: {
    devTasks: _config + 'tasks/dev/'
  },
  _root: _root,
  _src: _src,
  _app: _app,
  _build: _build,
  _ftp: _ftp,
  _config: _config,
  node_modules: 'node_modules/'
}
