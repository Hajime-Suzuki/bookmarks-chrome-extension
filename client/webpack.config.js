const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const paths = {
  publicPath: './',
  output: 'VVVVVVV'
}

const tsPath = {
  app: './src/app/index',
  popup: './src/popup/index',
  content: './src/content/index',
  background: './src/background/index'
}

const htmlPath = {
  app: 'public/index.html',
  popup: 'public/popup.html'
}

module.exports = {
  entry: {
    app: tsPath.app,
    content: tsPath.content,
    background: tsPath.background,
    popup: tsPath.popup
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.join(__dirname, paths.output),
    publicPath: paths.publicPath,
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        loader: 'file-loader',
        exclude: [/\.(js|ts|tsx|html|json)$/],
        options: {
          name: 'media/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['app'],
      inject: 'body',
      template: htmlPath.app
    }),
    new HtmlWebpackPlugin({
      chunks: ['popup'],
      inject: 'body',
      template: htmlPath.popup,
      filename: 'popup.html'
    }),
    new CopyPlugin([{ from: './public/manifest.json', to: './' }])
  ]
}
