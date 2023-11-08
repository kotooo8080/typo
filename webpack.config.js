const path = require('path'); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');

let htmlPageNames = ['crocembouche', 'tarttaten'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./${name}.html`,
    filename: `${name}.html`,
    chunks: ['main']
  })
});

module.exports = {
  entry: {
    main: './src/assets/js/index.js'
  }, // Точка входа для сборки проекта

  output: {
    filename: 'bundle.js', // Имя выходного файла сборки
    path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/, // Регулярное выражение для обработки файлов с расширением .css, .scss
        use: ['style-loader', 'css-loader', 'sass-loader'], // Загрузчики, используемые для обработки CSS/Sass - файлов
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: ['main']
    })
  ].concat(multipleHtmlPlugins),

  devServer: {
    port: 8080,
    hot: "only",
    static: {
      directory: path.join(__dirname, './'), // Каталог для статики
      serveIndex: true,
    },
    open: true, // Автоматически открывать браузер
  }, 

  mode: 'development', // Режим сборки
};