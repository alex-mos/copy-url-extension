const CopyPlugin = require("copy-webpack-plugin")
const path = require("path")

module.exports = {
  entry: "./src/js/background.js",
  mode: "development", // 'production',
  devtool: false,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/background.js"
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "src",
          to: "",
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/js/utils/**"]
          }
        }
      ]
    })
  ]
}
