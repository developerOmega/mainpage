const path = require('path');

module.exports = {
  entry: './src/app.ts',
  module: {
    rules: [
      { test: /\.ts/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.s[ac]ss/i, use: ["style-loader",  "css-loader", "sass-loader"], exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  mode: "development"
}