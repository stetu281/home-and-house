const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/html/index.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'aktuelles.html',
            template: './src/html/aktuelles.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'kontakt.html',
            template: './src/html/kontakt.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'news.html',
            template: './src/html/news.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'objekt.html',
            template: './src/html/objekt.html'
        }),
        new HTMLWebpackPlugin({
            filename: './anfragen/anfragen.html',
            template: './src/html/anfragen/anfragen.html'
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        preprocessor: (content, loaderContext) =>
                            content.replace(
                                /<include src="(.+)"\s*\/?>(?:<\/include>)?/gi,
                                (m, src) => {
                                    const filePath = path.resolve(loaderContext.context, src)
                                    loaderContext.dependency(filePath)
                                    return fs.readFileSync(filePath, 'utf8')
                                }
                            ),
                    }
                }
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                type: 'asset/resource',
            }
        ]
    },
};