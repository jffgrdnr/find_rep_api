let path = require('path');

module.exports = {
  entry: "./app/index.jsx",
  output: {
    filename: "bundle.js",
    path: "/public/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader'],
        include: __dirname + '/app'
      }
    ]
  }
};