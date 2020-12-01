const path = require("path");

module.exports = {
  mode: "development",
  entry: "./app/static-src/js/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "app/static/js"),
  },
  node: {
    fs: "empty",
  },
  watchOptions: {
    poll: true,
  },
};
