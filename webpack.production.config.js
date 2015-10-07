var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
    app: path.resolve(__dirname, 'app/main.js'),
    vendors: ['react']
  },
  output: {
    path: path.resolve(__dirname, 'prod'),
    filename: 'js/[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [
        node_modules_dir, 
        path.resolve(__dirname, 'app/js/lib/zepto.js'),
        path.resolve(__dirname, 'app/js/lib/frozen.js')
        ],
      loader: 'babel'
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    },
    {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    },
    {
      test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),
    new ExtractTextPlugin('all.css', {allChunks: true})
  ]
};

module.exports = config;