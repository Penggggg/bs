const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');

module.exports = {
    entry: {
        app: './src/index.tsx',
        vendor: './src/vendor.tsx'
    },

    output: {
        filename: '[name].[hash].js',
        path: '/'
    },

    resolve: {
        extensions: [ ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            { test: /\.tsx/, use: ['ts-loader'] },
            { test: /\.less/, use: ["style-loader", "css-loader", "less-loader"]},
        ]
    },

    plugins: [

        new webpack.optimize.CommonsChunkPlugin({
            name: [ 'app', 'vendor' ]
        }), 

        new HtmlWebpackPlugin({
            inject: false,
            template: HtmlWebpackTemplate,
            appMountId: 'app',
            links: ['https://unpkg.com/antd/dist/antd.min.css']
        }),

        new webpack.DefinePlugin({
         'process.env': {
            'NODE_ENV': JSON.stringify("develop")
         }
       })

    ],

        devServer: {
            historyApiFallback: true,
            hot: true,
            host: process.env.HOST,
            port: process.env.PORT,
        },

}