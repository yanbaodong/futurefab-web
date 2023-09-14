const { name } = require('./package');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV  === 'production'; //生产环境：publicPath为/；代码压缩，移除console
const isProd = process.env.NODE_ENV  === 'prod';//测试环境publicPath为/wees-seed/；代码压缩，包含console
const isDev = process.env.NODE_ENV === 'development'; //开发环境
module.exports = {
    publicPath: !isProd?'/':'/wees-seed/',
    outputDir: 'wees-seed', //构建时的输出目录
    assetsDir: 'assets', //放置静态资源的目录
    indexPath: 'index.html', //html 的输出路径
    filenameHashing: true, //文件名哈希值
    lintOnSave: false, //是否在保存的时候使用 `eslint-loader` 进行检查。
    runtimeCompiler: false,
    transpileDependencies: [], //babel-loader 默认会跳过 node_modules 依赖。
    productionSourceMap: false, //是否为生产环境构建生成 source map？
    configureWebpack: config => {
        /**配合qiankun使用的配置 */
        config.output.library = `${name}-App`;
        config.output.libraryTarget = 'umd';
        config.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
        if(!isDev){
            // gzip压缩
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path][base].gz',
                    algorithm: 'gzip',
                    test: /\.js$|\.css$|\.html$/,
                    threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: false, // 不删除原文件
                }),
            );
        }
        if (isProduction) {
            // 代码压缩
            config.plugins.push(
                new TerserWebpackPlugin({
                    terserOptions: {
                        output: {
                            beautify: false,
                            comments: false,
                        },
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log'],
                        },
                    },
                }),
            );
             //语言包大包设置
            new webpack.ContextReplacementPlugin(/ant-design-vue[/\\]locale$/, /zh_CN|en_US/);
        }
    },
      chainWebpack:(config)=>{
        if(!isDev){
            config.output.filename('assets/js/[name].[fullhash:8].js').end();
            config.output.chunkFilename('assets/js/[name].[chunkhash:8].js').end();
        }
      },
    devServer: {
        open: true, //编译后默认打开浏览器
        host: 'localhost', //域名
        port: 8082, // 端口
        https: false, //是否https
        headers: {
            'Access-Control-Allow-Origin': '*', //********子应用中必须设置跨域******************
        },
        //显示警告和错误
        proxy: {
            '/seed': {
                target: 'http://127.0.0.1:8088', //请求服务地址
                changeOrigin: true, //是否跨域
                // pathRewrite: {
                //     //重写路径
                //     '^/seed': '/seed1', //代理路径
                // },
            },
            '/portal': {
                target:'http://127.0.0.1:8081',
                changeOrigin: true, //是否跨域
            },
            '/dcp': {
                target: 'http://127.0.0.1:8082',
                changeOrigin: true, //是否跨域
            }
        },
    },
};
