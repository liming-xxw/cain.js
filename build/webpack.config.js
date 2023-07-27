const path = require("path");

module.exports = {
  entry: [
    "../package/core.js",
    "../package/directive.js",
    "../package/responsive.js",
    "../utils/strTarn.js",
    "../script/index.js",
  ],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "./cain.min.js",
  },
  mode: "production",
};
