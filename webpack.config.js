const webpack = require('webpack');

module.exports = {
    entry: './dist/PanthalassaApi.js',
    output: {
        filename: 'index.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ]
};