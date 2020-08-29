const path = require('path'); // для работы с относительными путями
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { 
    main: './src/pages/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
     // rules — это массив правил
     // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        //указывает пакет, который необходимо использовать при обработке этих файлов
        loader: 'babel-loader',
        // исключает папку node_modules из обработки
        exclude: '/node_modules/'
      },
      {
        // регулярное выражение, которое ищет все css файлы
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ],
      },
      // правило для работы с html
      {
        // регулярное выражение, которое ищет все html файлы
        test: /\.html$/,
        loader: 'html-loader',
      },
      // правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы перечисленных форматов
        test: /\.(png|svg|jpg|gif|woff2)$/,
        loader: 'file-loader',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html' // путь к файлу index.html
    }),
    new MiniCssExtractPlugin()
  ]
};
