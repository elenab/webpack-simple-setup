const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.ts",
    resolve:{
        extensions: ['.js', '.ts', '.tsx'],
    },
    module:{
        rules:[{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        }]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
}