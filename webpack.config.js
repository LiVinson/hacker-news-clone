const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader" },
      { test: /\.css/, use: ["style-loader", "css-loader"] },
      { test: /\.(png|svg|jpg|gif)$/, use: ["file-loader"] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.html",
      favicon: "./app/images/favicon.ico",
    }),
    new CopyPlugin([{ from: "_redirects" }]),
  ],
  devServer: {
    historyApiFallback: true,
  },
  mode: process.env.Node_ENV === "production" ? "production" : "development",
}
