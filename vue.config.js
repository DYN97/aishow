const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "./", dir);
}

// cdn预加载使用

// 是否使用gzip

// 需要gzip压缩的文件后缀

let prod =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test";
module.exports = {
  outputDir: '../../',
  publicPath: "/mobile/newapp/",
  assetsDir: prod ? "static" : "static",
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"));
    // .set("~", resolve("src/pages"))
    // .set("assets", resolve("src/assets"))
    // .set("@commons", resolve("src/commons"))
    // .set("@components", resolve("src/components"))
    // .set("@api", resolve("src/api"))
    // .set("@utils", resolve("src/utils"));
  },
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: () => {
    var myConfig = {};
    if (process.env.NODE_ENV == "development") {
      myConfig.devServer = {
        port: 8902,
        proxy: {
          '/api': {
            target: 'http://59.110.175.131:1111/service',
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