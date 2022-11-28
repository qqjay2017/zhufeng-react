/**
 * 自定义webpack打包规则
 */
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const isEnvProduction = process.env.NODE_ENV === "production";
const isEnvDevelopment = process.env.NODE_ENV === "development";
const pageArr = ["index", "login"],
  entryObj = {},
  htmlPlugins = [];

pageArr.forEach((chunk) => {
  entryObj[chunk] = `./src/${chunk}.js`;
  htmlPlugins.push(
    new HtmlWebpackPlugin({
      template: `./public/${chunk}.html`,
      filename: `${chunk}.html`,
      minify: true,

      // 导入的资源名称
      chunks: [chunk],
    })
  );
});

module.exports = {
  mode: isEnvDevelopment ? "development" : isEnvProduction ? "production" : "",
  entry: entryObj,
  output: {
    // 有助于强缓存的测试
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "dist"),
  },
  //解析器
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  devServer: {
    host: "127.0.0.1",
    port: 3000,
    open: true,
    hot: true, // 开启热更新,
    compress: true, // 开启服务器端的gzip压缩
    proxy: {
      "/jian": {
        // 代理的真正地址
        target: "https://www.jianshu.com/asimov",
        // 修改请求头中的origin源信息
        changeOrigin: true,
        // 支持webSocket通信机制
        ws: true,
        // 地址重写,主要用于区分不同代理的 前缀,从最后请求的真正地址中移除掉
        pathRewrite: { "/jian": "" },
      },
    },
  },
  /**
   * LOADER加载器
   *
   * 执行顺序: 下=>上,从右到左
   */
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          isEnvProduction ? MiniCssExtractPlugin.loader : "style-loader",

          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "javascript/auto", // webpack5需要的
        use: [
          {
            // 把指定大小内的图片转base64
            loader: "url-loader",
            options: {
              // 小于200kb,转base64
              limit: 200 * 1024,
              // 支持esModule
              esModule: false,
              // 大于200kb,没有base64,编译输出的位置
              name: "images/[name].[hash].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: isEnvProduction ? "[name].[contenthash].css" : "[name].css",
    }),
  ],
  // 优化项
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
  // 设置打包的最大资源的大小
  // https://webpack.docschina.org/configuration/performance/
  performance: {
    maxAssetSize: 100 * 1024 * 1024,
    maxEntrypointSize: 100 * 1024 * 1024,
  },
};
