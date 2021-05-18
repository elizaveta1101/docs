const path = require('path')
// import plugin
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { loader } = require('mini-css-extract-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties' //уже не нужен, bable обновили (для static в bable.js)
        ]
    }
    
    if (preset) opts.presets.push(preset)
    
    return opts
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]
    if (isDev) loaders.push('eslint-loader')
    return loaders
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ]

    if (isProd) {
        base.push(new BundleAnalyzerPlugin())
    }
    return base
}

console.log('IsDev: ', isDev)
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.jsx'],
        analytics: './analytics.ts'
    },
    output: {
        filename: filename('js'), //name - from entry, contenthash - generates depending on file content (resolve cache troubles)
        path: path.resolve(__dirname, 'dist')
    },
    //do not need to write full path 
    resolve: {
        extensions: ['.js', '.json', '.png'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    //create a vendor file with common code from different start points (like jquery in main and analytics)
    optimization: optimization(),
    //start server on port 4200 ti make auto reload page in browser
    devServer: {
        port: 4200,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : false,
    //add plugins to config
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/, //find files with ext in regexp and execute loaders
                use: cssLoaders()
                
                // [
                //     {
                //         loader: MiniCssExtractPlugin.loader,
                //         // options: {
                //         //     hmr: isDev, //hot module replacement, change some entity without reloading page
                //         //     // reloadAll: true
                //         // }
                //     },
                //     'css-loader'
                // ] //from RIGHT to LEFT!!
                //css-loader - give webpack an ability to understand css and import it to js
                //style-loader - add styles into head
                //MiniCssExtractPlugin.loader instead of style-loader
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use:  cssLoaders('sass-loader')
            },
            { //images
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            }, 
            {  //fonts
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript') 
                }
            }, 
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react') 
                }
            }, 
        ]
    }
}