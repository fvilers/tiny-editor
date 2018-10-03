const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './demo',
    hot: true
  },
  mode: 'development'
});
