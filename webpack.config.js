const path = require("path");

// general plugins...
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const LessFunc = require("less-plugin-functions");

// production plugins...
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = env => {
  const entry = path.join(__dirname, `./src/example/main`);

  return {
    context: __dirname,
    entry,
    output: {
      path: path.resolve(__dirname, `./dist/`),
      filename: `[name].[contenthash:8].js`,
      chunkFilename: `[name].[contenthash:8].js`,
      publicPath: "./"
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    devtool: "source-map",

    mode: "production",
    module: {
      rules: [
        {
          test: /less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader"
            },
            {
              loader: "less-loader"
            }
          ]
        },
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"]
              // plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        },
        {
          test: /\.(jpg|gif|woff|woff2|eot|ttf|png|jpeg|otf|svg|webp)/,
          use: [
            {
              loader: "url-loader",
              options: {
                // under 5kb
                limit: 1024 * 5
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(path.join(__dirname, "dist")),
      new ForkTsCheckerWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash:6].css"
        // chunkFilename: "[id].[contenthash:8].css"
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(__dirname, "./src/example/index.html"),
        // dirname: dirname,
        chunks: "all"
      })
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }
  };
};
// console.log(process.env.NODE_ENV);
