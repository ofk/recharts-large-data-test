const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const NODE_PROD = (NODE_ENV === 'production');
const nodeModulePath = path.resolve(__dirname, 'node_modules');

const devServer = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || '8888',
  inline: false,
  hot: true,
  historyApiFallback: true,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};
const publicPath = `http://${devServer.host}:${devServer.port}/`;

module.exports = {
  entry: {
    chainerui: [
      `webpack-dev-server/client?${publicPath}`,
      'babel-polyfill',
      './src/index.jsx',
    ]
  },
  output: {
    filename: '[name].js',
    publicPath
  },
  devServer,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: nodeModulePath,
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }],
            'stage-0',
            'react'
          ],
          plugins: ["transform-object-rest-spread", "babel-plugin-lodash"],
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.es6']
  },
  devtool: NODE_PROD ? false : 'inline-source-map',
  target: 'web',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin()
  ],
  node: {
    __dirname: false,
    __filename: false
  }
};

