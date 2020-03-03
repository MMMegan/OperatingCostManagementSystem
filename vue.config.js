module.exports = {
    lintOnSave: false,
    configureWebpack: {},
    devServer: {
        proxy: {
            "/api":{

                target:"http://localhost:8083",
                pathRewrite:{
                    '^/api':''
                }
            }
        }
          
        }
    }