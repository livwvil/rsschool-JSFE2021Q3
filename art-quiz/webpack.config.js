const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval',
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    entry: ['./src/index.js'],
    output: {
      filename: isProduction ? '[name]-[hash].js' : '[name].js',
      path: path.join(__dirname, '/build'),
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.join(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { url: false },
            },
            'sass-loader',
          ],
        },
        // {
        //   test: /\.(png|svg|jpe?g|gif|ttf)$/,
        //   use: {
        //     loader: 'file-loader',
        //   },
        // },
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: {
            // Disables attributes processing
            sources: false,
          },
        },
      ],
    },
    devServer: {
      static: './src/',
      port: 9000,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: {
          collapseWhitespace: isProduction,
        },
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? 'styles/[name]-[hash].css' : 'styles/[name].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './src/assets/'),
            to: path.resolve(__dirname, './build/assets/'),
          },
        ],
      }),
    ],
  };
};
