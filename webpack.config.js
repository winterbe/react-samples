var path = require('path');

module.exports = {
    entry: './src/js/app.js',
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