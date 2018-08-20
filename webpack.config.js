const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const SRC_DIR = path.join(__dirname, '/client/src');
// const DIST_DIR = path.join(__dirname, '/client/dist/resources');
const DIST_DIR = path.join(__dirname, '/client/dist');
module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // {
      //   test: /\.(scss|sass)$/,
      //   loader: 'style-loader!css-loader!sass-loader'
      // },
      // {
      //   test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      // },
      // {
      //   test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: "url-loader?limit=10000&mimetype=application/font-woff"
      // },
      // {
      //   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      // },
      // {
      //   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: "file-loader"
      // },
      // {
      //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      // },
      {
        test: /\.css$/, loader: 'style-loader!css-loader',
      },
      {
        test: /\.json/,
        type: 'javascript/auto',
        use: [require.resolve('json-loader')],
      },
      {
        test: /\.png$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
