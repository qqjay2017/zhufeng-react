/**
 * 自定义webpack打包规则
 */
const path = require('path')
module.exports = {
    mode:'development',
    entry: './src/index.js',
    output: {
        // 有助于强缓存的测试
        filename: 'bundle.[name].[hash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
}