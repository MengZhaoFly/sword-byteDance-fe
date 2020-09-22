const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.base.js');

const clientConfig = {
  entry: path.resolve(__dirname, '../src/client/index.js'),
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name]_bundle.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [{
      test: /(.css|.less)$/,
      use: [
        MiniCssExtractPlugin.loader,
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
      exclude: [path.resolve(__dirname, '../node_modules/')],
    },
    ],
  },
  plugins: [
    new ReactLoadablePlugin({
      filename: path.resolve(__dirname, '../public/react-loadable.json'),
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../static'), to: './' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../template/index.html'),
      inject: false,
    }),
    new webpack.DefinePlugin({
      CLIENT: true,
      SERVER: false,
    }),
  ],
};

module.exports = merge(config, clientConfig);
