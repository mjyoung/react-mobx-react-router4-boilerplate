const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'babel-polyfill',
    'whatwg-fetch',
    'webpack-dev-server/client?http://localhost:2000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'app.[hash].js'
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: [
              ['es2015', { modules: false }],
              'stage-0',
              'react'
            ],
            plugins: [
              'transform-async-to-generator',
              'transform-decorators-legacy'
            ]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
      },
      {
        test: /\.scss|css$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[local]___[hash:base64:5]',
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ hash: false, template: './index.hbs' }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /nb/),
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      debug: true,
      options: {
        postcss() {
          return [precss, autoprefixer];
        },
        context: path.join(__dirname, 'src'),
        output: { path: path.join(__dirname, 'dist') }
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV)
      }
    })
  ]
};
