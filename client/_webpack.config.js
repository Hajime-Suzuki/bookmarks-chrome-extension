const resolve = require('resolve')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin')
const typescriptFormatter = require('react-dev-utils/typescriptFormatter')

const IS_PRODUCTION = process.env === 'production'

// const isEnvDevelopment = webpackEnv === 'development'
// const isEnvProduction = webpackEnv === 'production'

const publicPath = './'

const paths = {
  content: 'src/content/index',
  background: 'src/background/index',
  popup: 'src/popup/index',
  app: 'src/app/index',
  output: 'build'
}

module.exports = {
  mode: IS_PRODUCTION ? 'production' : 'development',
  entry: {
    content: paths.content,
    background: paths.background,
    popup: paths.popup,
    app: paths.app
  },
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].js',
    publicPath: publicPath
  },

  module: {
    rules: [
      { parser: { requireEnsure: false } },

      // {
      //   test: /\.(js|mjs|jsx)$/,
      //   enforce: 'pre',
      //   use: [
      //     {
      //       options: {
      //         formatter: require.resolve('react-dev-utils/eslintFormatter'),
      //         eslintPath: require.resolve('eslint')
      //       },
      //       loader: require.resolve('eslint-loader')
      //     }
      //   ],
      //   include: paths.appSrc
      // },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[ext]'
            }
          },
          // Process application JS with Babel.
          // The preset includes JSX, Flow, TypeScript, and some ESnext features.
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),
              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '@svgr/webpack?-svgo,+ref![path]'
                      }
                    }
                  }
                ]
              ],
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              cacheCompression: IS_PRODUCTION,
              compact: IS_PRODUCTION
            }
          },
          // Process any JS outside of the app with Babel.
          // Unlike the application JS, we only compile the standard ES features.
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  require.resolve('babel-preset-react-app/dependencies'),
                  { helpers: true }
                ]
              ],
              cacheDirectory: true,
              cacheCompression: IS_PRODUCTION,

              // If an error happens in a package, it's possible to be
              // because it was compiled. Thus, we don't want the browser
              // debugger to show the original code. Instead, the code
              // being evaluated would be much more helpful.
              sourceMaps: true
            }
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[ext]'
            }
          }
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ]
      }
    ]
  },
  plugins: [
    /**
     * @Note when running build.js by yarn build, it copies files in public. setting. specifying filename overwrites the html file.n
     *
     */

    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      chunks: ['popup'],
      inject: 'body',
      // template: path.join(__dirname, '../public/popup.html')
      template: paths.popupHtml,
      filename: 'popup.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['app'],
      inject: 'body',
      template: paths.appHtml,
      ...(IS_PRODUCTION && {
        minify: {
          removeComments: true,
          collapseWhitespace: false,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      })
    }),

    new ForkTsCheckerWebpackPlugin({
      typescript: resolve.sync('typescript', {
        basedir: paths.appNodeModules
      }),
      async: true,
      useTypescriptIncrementalApi: true,
      checkSyntacticErrors: true,
      tsconfig: paths.appTsConfig,
      reportFiles: [
        '**',
        '!**/*.json',
        '!**/__tests__/**',
        '!**/?(*.)(spec|test).*',
        '!**/src/setupProxy.*',
        '!**/src/setupTests.*'
      ],
      watch: paths.appSrc,
      silent: false,
      // The formatter is invoked directly in WebpackDevServerUtils during development
      formatter: IS_PRODUCTION ? typescriptFormatter : undefined
    })
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  // Turn off performance processing because we utilize
  // our own hints via the FileSizeReporter
  performance: false
}
