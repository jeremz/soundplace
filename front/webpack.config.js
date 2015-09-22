module.exports = {
    // watch: true,
    entry: "./app/app.js",
    output: {
        path: __dirname,
        filename: "scripts/bundle.js"
    },
    module: {
    loaders: [
      { test: /\.hbs$/, loader: "handlebars-loader" }
    ]
  }
};