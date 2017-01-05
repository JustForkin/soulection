var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var ROOT_PATH = path.resolve(__dirname)
var ENTRY_PATH = path.resolve(ROOT_PATH, 'src/index.js')
var SRC_PATH = path.resolve(ROOT_PATH, 'src')
var STATIC_PATH = path.resolve(ROOT_PATH, '../static')
var COMPONENTS_PATH = path.resolve(ROOT_PATH, '../src/components')
var STYL_PATH = path.resolve(ROOT_PATH, 'src/styl')
var TEMPLATE_PATH = path.resolve(ROOT_PATH, 'src/index.html')
var SHADER_PATH = path.resolve(ROOT_PATH, 'src/shaders')
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist')
var debug = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: ENTRY_PATH,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'WebGL Project Boilerplate',
      template: TEMPLATE_PATH,
      inject: 'body'
    })
  ],
  output: {
    path: BUILD_PATH,
    filename: '[name].js'
  },
  resolve: {
    root: SRC_PATH,
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'static': STATIC_PATH,
      'components': COMPONENTS_PATH,
      'styl': STYL_PATH
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: SRC_PATH,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['es2015']
      }
    },
    {
      test: /\.glsl$/,
      include: SHADER_PATH,
      loader: 'webpack-glsl'
    },
    {
      test: /\.styl$/,
      loader: 'style!css!stylus',
      exculde: /node_modules/
    }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  debug: debug,
  devtool: debug ? 'eval-source-map' : 'source-map'
}
