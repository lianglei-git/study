
const webpack = require('webpack')
// webpack({
//     optimization: {
//         minimize: false
//     }
// })
module.exports = {
    entry: "./entry.js",
    mode: "production",
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.cpp$/,
                use: 'raw-loader'
            }
        ]
    }
}