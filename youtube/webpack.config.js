const path = require('path');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const isProduction = (NODE_ENV === 'production');

// SCSS LOADERS SETTINGS
const scssLoaders = [
  'css-loader',
  'sass-loader'
];

const bundleName = 'app-bundle';

const config = {
    name: 'js',
    entry: [
        './scripts/app.js',
        './scss/entry.scss'
    ],
    output: {
        path: path.join(__dirname, './public/dist'),
        filename: !isProduction ? `${bundleName}.js` : `${bundleName}.min.js`
    },
    resolve: {
        extensions: ['', '.js', '.json', '.coffee']
    },
    module: {
        loaders: [ 
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-2']
                }
            },
            {
                test: /\.scss$/, 
                loader: ExtractTextPlugin.extract('style-loader', scssLoaders.join('!'))
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin(
            !isProduction ? `${bundleName}.css` : `${bundleName}.min.css`
        )
    ],
    devtool: isProduction ? '' : "source-map",
};

if (isProduction) {
    config.plugins.push(
        new Webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

module.exports = config;