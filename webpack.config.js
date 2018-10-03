const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(['demo']),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'demo')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './demo',
    hot: true
  },
  mode: 'development'
};
