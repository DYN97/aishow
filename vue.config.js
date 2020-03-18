module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    configureWebpack: config => {
        var myConfig = {};
        if (process.env.NODE_ENV == "development") {
            myConfig.devServer = {
                port: 8902,
                proxy: {
                    '/api': {
                        target: 'http://localhost:52317/service',
                        changeOrigin: true,
                        pathRewrite: {
                            '^/api': '/'
                        }
                    }
                }
            }


        }
        return myConfig;




    }
}