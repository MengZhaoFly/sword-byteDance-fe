const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const config = require('./webpack.base.js');

const serverConfig = {
  target: 'node',
  node: false,
  entry: path.resolve(__dirname, '../src/server/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../build'),
  },
  module: {
    rules: [
      {
        test: /(.css|.less)$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[hash:base64:5]',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      SERVER: true,
      CLIENT: false,
    }),
  ],
};

module.exports = merge(config, serverConfig);
