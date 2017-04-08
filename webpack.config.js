module.exports = {
  entry:
  {
    editor: "./web_modules/entry/editor.js"
  },
  output:
  {
    filename: "[name]-entry.js",
    path: __dirname + "/public/built"
  },
  module:
  {
    rules: [
    {
      test: /\.handlebars$/,
      loader: "handlebars-loader"
    },
    {
      test: /\.css$/,
      loader: "style!css"
    }]
  }
};
