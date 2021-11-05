const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [{ 
      test: /\.js?$/ ,
      exclude: /(node_modules|bower_components)/,
      use: {
          // `.swcrc` in the root can be used to configure swc
          loader: "swc-loader"
      }
    }],
  },
};
