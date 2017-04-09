module.exports = {
  entry:
  {
    editor: "./web_modules/entry/editor.js",
    index: "./web_modules/entry/index.js"
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
      test: /\.hbs$/,
      loader: "handlebars-loader"
    },
    {
      test: /\.css$/,
      loader: "style!css"
    }]
  }
};
