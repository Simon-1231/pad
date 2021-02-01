const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true, //保存的时候检查格式
  productionSourceMap: false,
  devServer: {
    // can be overwritten by process.env.HOST
    host: "localhost",
    port: 9000,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/api": {
        // target: `http://192.168.1.192:13012`,
        // target: `https://ztysp.e-tecsun.com`,
        // target: `http://192.168.1.60:13012`,
        // target: "http://192.168.1.192:13012", // 正式
        target: "https://bjztys.e-tecsun.com/api",
        // target: "https://bijie.e-tecsun.com/api",
        // target: "http://192.168.4.43:13012",
        changeOrigin: true,
        secure: false,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html"
    },
    extension: {
      entry: "src/extension/extension.main.js",
      template: "public/extension.html"
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("src", resolve("src"))
      .set("components", resolve("src/components"));
  },
  //设置安装包图标
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true, //设置在vue里面可以引入electron
      builderOptions: {
        appId: "com.example.app",
        copyright: "Copyright © 2020", //版权信息
        directories: {
          output: "./dist" //输出文件路径
        },
        win: {
          icon: "./src/assets/ic_launcher.png"
        },
        mac: {
          icon: "./src/assets/ic_launcher.png"
        },
        //安装包名字
        productName: "毕节PAD",
        // 拷贝静态文件到指定位置,否则打包之后出现找不到资源的问题.将整个resources目录拷贝到 发布的根目录下
        extraResources: [
          {
            from: "src/resources/",
            to: "./"
          },
          {
            from: "src/resources/pad/WltRS.dll",
            to: "../"
          }
        ],
        publish: ["github"]
      },
      externals: ["ffi-napi", "ref-napi"]
    }
  }
};
