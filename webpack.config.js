const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bottom-sheet.js',
            library: 'ButtonSheet',
            libraryTarget: 'umd',
            globalObject: 'this',
            umdNamedDefine: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        optimization: {
            minimize: isProduction,
            minimizer: [new TerserPlugin({
                extractComments: false,
            })]
        },
        devtool: isProduction ? false : 'source-map',
        resolve: {
            alias: {
                'hammerjs': path.resolve(__dirname, 'node_modules/hammerjs')
            }
        }
    };
};