const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

const inProduction = (process.env.NODE_ENV === 'production');

module.exports = {

    entry: [
        './src/app.js',
        './src/app.scss'
    ],
    output: {
        path: path.resolve('dist'),
        filename: 'app.js'
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    }
}

module.exports.plugins = module.exports.plugins || [];


module.exports.plugins.push(
    new ExtractTextPlugin({
        filename: 'app.min.css',
        allChunks: true,
    }),

    new webpack.LoaderOptionsPlugin({
        minimize: inProduction
    }),

    new CleanWebpackPlugin(['dist'], {
        root: __dirname,
        verbose: true,
        dry: false
    })

    // Disabled because it can't read react classNames and such.
    /* new PurifyCSSPlugin({
        // Give paths to parse for rules. These should be absolute!
        paths: glob.sync(path.join(__dirname, 'index.html')),
        minimize: inProduction
    }) */
);


if (inProduction) {
    module.exports.plugins.push(
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production')}
        }),
        new webpack.optimize.UglifyJsPlugin()
    );
}
