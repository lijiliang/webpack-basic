var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');   //webpack 插件

//定义一些文件路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'app/templates');   //模板存放路径

var nameStr = '[name].[hash:6]';  //设定文件路径及md5

module.exports = {
    entry: {
        app: path.resolve(APP_PATH, 'index.js'),
        mobile: path.resolve(APP_PATH, 'mobile.js'),
        //添加要打包在vendors里面的库
        vendors: ['jquery', 'moment']
    },
    output: {
        path: BUILD_PATH,
        // filename: 'bundle.js'
        filename: nameStr + '.js'
    },
    module: {

        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'less'],
                include: APP_PATH
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: "url?limit=8192&name=[folder]/"+ nameStr+".[ext]"
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: APP_PATH,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        //使用uglifyJs压缩你的js代码
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {  //设置这个可以忽略压缩时产生的警告
                warnings: false
            }
        }),
        //把入口文件里面的数组打包成verdords.js
        new webpack.optimize.CommonsChunkPlugin('vendors','vendors.[hash:6].js'),

        // 添加我们的插件，会自动生成一个html文件
        new HtmlwebpackPlugin({
            title: 'Hello World app',
            template: path.resolve(TEM_PATH, 'index.html'),
            filename: 'index.html',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['app', 'vendors'],
            //要把script插入到标签里
            inject: 'body'
          }),
          new HtmlwebpackPlugin({
            title: 'Hello Mobile app',
            template: path.resolve(TEM_PATH, 'mobile.html'),
            filename: 'mobile.html',
            chunks: ['mobile', 'vendors'],
            inject: 'body'
          })
    ],

}
