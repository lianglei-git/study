"use strict";

var path = require('path');

var Ug = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './index.js',
  devtool: 'source-map',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /.js$/,
      use: 'babel-loader',
      exclude: /node_modules/ // 排除转换的文件夹

    }]
  },
  plugins: [// new Ug()
  ],
  mode: 'production'
};