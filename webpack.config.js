var path = require('path');

module.exports = {
    entry: './src/js/app.js',
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: 'src/bundle.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'src/js'),
                loader: 'babel-loader'
            }
        ]
    }
};