const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/custom-tool.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'custom-tool.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};