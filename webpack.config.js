const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
require("@babel/register");

// Webpack Configuration
const config = {

    entry: ['babel-polyfill', './src/index.js'],

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },

    module: {
        rules : [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.png$/,
                use: ['file-loader'],
            }
        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            title: 'Ceros Ski',
            template: 'src/index.html'
        }),
        new CopyPlugin([
            {
                from: 'img/*',
                to: ''
            },
        ])
    ],
    resolve: {
      modules: [path.resolve(__dirname, './src'), 'node_modules'],
      extensions: ['.js', '.json'],
      alias: {
        reducers: path.resolve(__dirname, './src/store/reducers')
      }
    }
};

module.exports = config;
