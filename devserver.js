/* eslint-disable import/no-extraneous-dependencies, no-console */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const port = process.env.PORT || 2000;

// webpack dev server options
// https://webpack.js.org/configuration/dev-server/#components/sidebar/sidebar.jsx
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: 'normal',
  compress: true
}).listen(port, 'localhost', (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`Listening at http://localhost:${port}`);
});
