const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(['demo']),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
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
  }
};
