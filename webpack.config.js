const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              exportType: 'string',
            },
          },
        ],
      },
    ],
  },
};
