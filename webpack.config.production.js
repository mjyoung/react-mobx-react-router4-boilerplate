const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'production';

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router'],
    app: [
      'babel-polyfill',
      './src/index'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'assets/[name].[hash].js',
    chunkFilename: 'assets/[name].[chunkhash].js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
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
        test: /\.scss$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&localIdentName=[local]___[hash:base64:5]',
            'postcss-loader',
            'resolve-url-loader',
            'sass-loader?sourceMap'
          ]
        })
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      debug: true,
      options: {
        postcss() {
          return [precss, autoprefixer];
        },
        context: path.join(__dirname, 'src'),
        output: {
          path: path.join(__dirname, 'dist')
        }
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('assets/styles.[hash].css'),
    new HtmlWebpackPlugin({
      hash: false,
      template: './index.hbs'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV)
      }
    })
  ]
};
