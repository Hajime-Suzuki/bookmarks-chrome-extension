const path = require('path')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const paths = {
  publicPath: './',
  output: './build'
}

const tsPath = {
  app: './src/app/index',
  popup: './src/popup/index',
  content: './src/content/index',
  background: './src/background/index'
}

const htmlPath = {
  app: './src/index.html',
  popup: './src/popup.html'
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
    path: path.resolve(paths.output),
    publicPath: paths.publicPath,
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
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
    new Dotenv(),
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
    new CopyPlugin(['./src/manifest.json', './src/img/icon.png']),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      tslint: true
    })
  ]
}
