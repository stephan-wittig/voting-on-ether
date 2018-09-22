const HtmlWebPackPlugin = require("html-webpack-plugin");

const path = require("path");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});



module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.resolve("build_webpack"),
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { importLoaders: 2 },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: ['last 1 version', 'ie >= 11'],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, '..', 'node_modules')],
            },
          },
        ],
      },
    ]
  },
  plugins: [
    htmlWebpackPlugin
  ]
};
