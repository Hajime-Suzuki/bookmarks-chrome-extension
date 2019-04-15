const Dotenv = require('dotenv-webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const smp = new SpeedMeasurePlugin()

const paths = {
  publicPath: './',
  output: './build-pwa'
}

const tsPath = {
  app: './src/app/index'
}

const htmlPath = {
  app: './src/pwa.html'
}

module.exports = {
  entry: {
    app: tsPath.app
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
    // new BundleAnalyzerPlugin(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      chunks: ['app'],
      inject: 'body',
      template: htmlPath.app
    }),
    new CopyPlugin([
      { from: './src/manifest.pwa.json', to: 'manifest.json' },
      './src/img/book.png'
    ]),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      tslint: true
    })
  ]
}
