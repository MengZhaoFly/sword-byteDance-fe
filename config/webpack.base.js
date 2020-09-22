const path = require('path');
const webpack = require('webpack');
const argv = require('yargs-parser')(process.argv.slice(2));

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /(.js|.jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /.md$/,
        use: [
          'babel-loader',
          {
            loader: path.resolve(__dirname, './md-loader.js'),
          },
        ],
      },
      {
        test: /.tpl$/,
        use: [
          'babel-loader',
          {
            loader: path.resolve(__dirname, './tpl-loader.js'),
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: `'${argv.mode}'`,
    }),
  ],
};
