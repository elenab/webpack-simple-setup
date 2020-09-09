const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
}