const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin  = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const srcDir = 'public_src';
const outputDir = '../public';

module.exports = {
    devtool: "eval",
    entry: {
        app: path.resolve(srcDir, 'bootstrap.ts')
    },
    output: {
        path: path.resolve(__dirname, outputDir),
        filename: '[name].[hash].bundle.js',
        sourceMapFilename: '[name].[hash].map',
        chunkFilename: '[id].[hash].chunk.js'
    },
    resolve: {
        extensions: ['.ts', '.component.ts', '.service.ts', '.js', '.component.html', '.component.less', '.less', '.css']
    },
    module: {
        rules: [
            { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader' },
            { test: /(\.component|\.service|)\.ts$/, use: ['ts-loader'] },
            { test: /\.html$/, use: [{ loader: 'html-loader', options: { minimize: false } }] },
            { test: /(\.component|)\.less$/, use: ['to-string-loader', 'css-loader', 'less-loader'] },
            { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })},
            { test: /\.(png|gif|jpg)$/, use:[{ loader: 'file-loader', options: { name: 'images/[name].[ext]'} } ]},
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use:[{ loader: 'file-loader', options: { name: 'fonts/[name].[ext]'} } ]},
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use:[{ loader: 'file-loader', options: { name: 'fonts/[name].[ext]'} } ]},
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use:[{ loader: 'file-loader', options: { name: 'fonts/[name].[ext]'} } ]},
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use:[{ loader: 'file-loader', options: { name: 'fonts/[name].[ext]'} } ]},
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use:[{ loader: 'file-loader', options: { name: 'fonts/[name].[ext]'} } ]}
        ],
        noParse: [ path.join(__dirname, 'node_modules', 'angular2', 'bundles') ]
    },
    plugins: [
        new ExtractTextPlugin("[name].[contenthash].css"),
        new HtmlWebpackPlugin({
            template: path.resolve(srcDir, 'index.html'),
            inject: true
        }),
        new ScriptExtHtmlWebpackPlugin({
          defaultAttribute: 'defer'
        }),
        new WebpackCleanupPlugin({
          exclude: ['index.html', 'data/airports.geojson']
        })
    ]
};
