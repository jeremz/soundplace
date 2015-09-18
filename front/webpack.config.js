module.exports = {
    // watch: true,
    entry: "./assets/scripts/all.js",
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