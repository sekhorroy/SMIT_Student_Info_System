const webpack = require('webpack');
const merge = require('webpack-merge');

const helpers = require('./helpers');
const commonConfig = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'production',

  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  }

  
});

module.exports = {
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions:{
        compressor: {
        warnings: false,
        screw_ie8: true
      },
      output: {
        comments: false
      }},
      
})],
  },
};

