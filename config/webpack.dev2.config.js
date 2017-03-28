const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');

module.exports = {
    entry: {
        app: './src/index.tsx',
        vendor: './src/vendor.tsx'
    },

    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: "/static/",
        filename: '[name].js',
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

        new webpack.DefinePlugin({
         'process.env': {
            'NODE_ENV': JSON.stringify("development")
         }
       })

    ]
}