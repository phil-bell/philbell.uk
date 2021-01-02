const path = require("path");

module.exports = {
  mode: "development",
  entry: "./app/static-src/js/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "app/static/js"),
  },
  watchOptions: {
    poll: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
