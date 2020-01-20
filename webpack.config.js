const path = require("path");

// general plugins...
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// production plugins...
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = env => {
  return {
    context: __dirname,
    entry: path.join(__dirname, `./src/example/main`),

    output: {
      path: path.resolve(__dirname, `./dist/`),
      filename: `[name].[hash:8].js`,
      chunkFilename: `[name].[hash:8].js`,
      publicPath: "/dist"
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    devtool: "source-map",
    devServer: {
      // contentBase: path.join(__dirname, "./src/example"),
      port: 8081,
      host: "0.0.0.0",
      historyApiFallback: true
    },
    mode: "production",
    module: {
      rules: [
        {
          test: /less$|css$/,
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
            }
          }
        },
        {
          test: /\.(jpg|gif|woff|woff2|eot|ttf|png|jpeg|otf|svg|webp)/,
          use: [
            {
              loader: "url-loader",
              options: {
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
        filename: "[name].[hash:6].css"
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(__dirname, "./src/example/index.html"),
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
