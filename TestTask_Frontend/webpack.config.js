const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

const extensions = [".ts", ".tsx", ".js", "jsx"];
const exclude = /node_modules/;

module.exports = function(){
  return {
    target: 'web',
    devtool: 'source-map',
    resolve: {
      modules: ["node_modules", "bower_components"],
      alias: {
        "jquery": "jquery/dist/jquery.min.js"
      },
      extensions: extensions,
    },
    entry: {
      app: [
        './src/js/index.tsx',
        './src/index.html'
      ]
    },
    output: {
      path: path.join(__dirname, '..', 'build'),
      publicPath: '/',
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: exclude,
          use: { loader: 'awesome-typescript-loader' },
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        },
        {
          test: /\.tsx?$/,
          exclude: exclude,
          enforce: 'pre',
          loader: 'tslint-loader',
          options: { /* Loader options go here */ }
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules|bower_components/,
          use: 'babel-loader'
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules|bower_components/,
          use: 'babel-loader'
        },
        {
          test: /\.html(\?v=\d+\.\d+\.\d+)?$/,
          exclude: /node_modules|bower_components/,
          use: 'file-loader?name=[path][name].[ext]&context=src'
        },
        {
          test: /\.(scss)$/,
          use: [{
            loader: 'style-loader', // inject CSS to page
          }, {
            loader: 'css-loader', // translates CSS into CommonJS modules
          }, {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }, {
            loader: 'sass-loader' // compiles SASS to CSS
          }]
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        },
        {
          test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
          use: 'file-loader'
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
        ReactDOM: "react-dom",
        PropTypes: "prop-types"
      }),
      new ExtractTextPlugin({
        filename: 'styles.css',
        allChunks: true
      })
    ],
    devServer: {
      historyApiFallback: true,
      compress: true,
      hot: true,
      noInfo: true,
      proxy: [
        {
          context: '/api',
          target: {
            host: '192.168.0.63',
            protocol: 'http:',
            port: 80
          },
        }
      ]
    },
  };
}