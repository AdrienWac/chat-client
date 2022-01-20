module.exports = {
    lintOnSave: false,
    devServer: {
        watchOptions: {
            poll: true, // or use an integer for a check every x milliseconds, e.g. poll: 1000,
            ignored: /node_modules/ // otherwise it takes a lot of time to refresh
        }
    },
    configureWebpack: {
        devtool: 'source-map'
    }
};