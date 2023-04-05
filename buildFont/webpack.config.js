const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin')
module.exports = {
    entry: './index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist')
    },
    mode: 'production',
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [ 'style-loader',MiniCss.loader, 'css-loader']
            },
            // {
            //     test: 
            // },
            {
                test: /\.(woff|ttf|woff2)$/,
                // type: 'asset/resource',
                type: 'asset/inline',

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./index.html',
			filename:'index.html'
        }),
        new MiniCss({
            filename: 'css/[name].css'
        })
    ]
}