/**
 * 自定义webpack打包规则
 */
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
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
  mode: "development",
  entry: entryObj,
  output: {
    // 有助于强缓存的测试
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    host: "127.0.0.1",
    port:3000,
    open:true,
    hot:true,// 开启热更新,
    compress:true ,// 开启服务器端的gzip压缩
    proxy:{
      "/jian":{
        // 代理的真正地址
        target:"https://www.jianshu.com/asimov",
        // 修改请求头中的origin源信息
        changeOrigin:true,
        // 支持webSocket通信机制
        ws:true,
        // 地址重写,主要用于区分不同代理的 前缀,从最后请求的真正地址中移除掉
        pathRewrite:{"/jian":""}
      }
    }


  },
  plugins: [new CleanWebpackPlugin(), ...htmlPlugins],
};
