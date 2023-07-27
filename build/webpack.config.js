const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./build.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "./cain.min.js",
  },
  mode: "production",
};
// production
// development