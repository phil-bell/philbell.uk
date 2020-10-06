const path = require("path");

module.exports = {
  mode: "development",
  entry: "./static-src/js/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "static/js"),
  },
  node: {
    fs: "empty",
  },
};
