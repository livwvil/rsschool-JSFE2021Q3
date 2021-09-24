const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "dev";
const isProd = !isDev;
const SRC = path.resolve(__dirname, "./src");

module.exports = {
  entry: {
    main: `${SRC}/ts/index.ts`,
  },
  output: {
    filename: isDev ? "[name].js" : "[name]-[hash].js",
    path: path.resolve(__dirname, "./dist"),
    // assetModuleFilename: "assets/[hash][ext]", for imports inside scripts
  },
  devtool: isDev ? "inline-source-map" : false,
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  ...(isDev
    ? {
        devServer: {
          open: true,
          port: 5050,
          hot: isDev,
        },
      }
    : {}),
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // {
      //   test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
      //   type: 'asset/resource',
      // },
      // {
      //   test: /\.(woff(2)?|eot|ttf|otf)$/i,
      //   type: 'asset/resource',
      // },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: `${SRC}/index.html`,
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "[name]-[hash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./src/assets/"),
          to: path.resolve(__dirname, "./dist/assets/"),
        },
      ],
    }),
  ],
};
