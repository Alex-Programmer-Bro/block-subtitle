const path = require("path");
const srcDir = path.join(__dirname, "..", "src");
const CopyPlugin = require("copy-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const absolute = (filepath) => path.resolve(__dirname, filepath);

module.exports = {
  entry: {
    background: path.join(srcDir, "background.ts"),
    content_script: path.join(srcDir, "content_script.tsx"),
  },
  output: {
    path: path.join(__dirname, "../dist/js"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks(chunk) {
        return chunk.name !== "background";
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: [absolute('../node_modules'), absolute('../src/*.stories.tsx')],
      },
      {
        test: /\.css$/,
        use: ["to-string-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: "../", context: "public" }],
      options: {},
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
  performance: {
    hints: false
  },
  cache: true
};
