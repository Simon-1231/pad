const ffi = require("ffi-napi");
// var ref = require("ref-napi");//ref.types.int  可以用ref 确认类型
// var ArrayType = require("ref-array-napi"); //列表转换
const path = require("path");
const iconv = require("iconv-lite");
// let { arch } = process; // x64
const isDevelopment = process.env.NODE_ENV !== "production";
//默认加载 32位 DLL
var urlPath = "";
//大终端urlPath
var terminalUrlPath = "";
if (isDevelopment) {
  urlPath = "src/resources/pad/IDReader";
  terminalUrlPath = "src/resources/terminal/IDReader";
} else {
  urlPath = "resources/pad/IDReader";
  terminalUrlPath = "resources/terminal/IDReader";
}
let dllFilePath = path.resolve(urlPath);
let terminalDllFilePath = path.resolve(terminalUrlPath);
console.log("dllFilePath", terminalDllFilePath);
//加载 64位 DLL 有32位直接加载32位就好了，32位dll 在64位系统也能运行，只是性能有点损耗
// 映射到C语言 数组类型,并导出
// const IntArray = ArrayType(ref.types.int);
// 加载 DLL文件,无需写扩展名,将DLL中的函数映射成JS方法
// 导出为JS方法
const IDReader = new ffi.Library(dllFilePath, {
  //映射的参数跟 接口组提供的接口文档一致， 具体请查阅https://zhuanlan.zhihu.com/p/40526242
  // 例如add: ['int',['int', 'int*']  addPtr: ['void', ['int', 'int', 'int*']]
  iReadMultiCard: ["long", ["string", "string"]]
});

const TerminalIDReader = new ffi.Library(terminalDllFilePath, {
  //映射的参数跟 接口组提供的接口文档一致， 具体请查阅https://zhuanlan.zhihu.com/p/40526242
  // 例如add: ['int',['int', 'int*']  addPtr: ['void', ['int', 'int', 'int*']]
  iReadMultiCard: ["long", ["string", "string"]]
});

module.exports = {
  iReadMultiCard() {
    //先创建一个buffer 用来装结果
    var result1 = new Buffer(150);
    //获取结果，可以用异步方式
    var code = IDReader.iReadMultiCard("C:\\", result1);
    //返回的结果要进行转码，node.js 默认是utf-8 ,底层包的是gb2312，要转码
    var idCardData = iconv.decode(result1, "GBK");
    //把结果放入实体类
    var params = {
      code: code,
      result: idCardData
    };
    // console.log("code", code);
    // console.log("idCardData", idCardData);
    return params;
  },
  /**
   * 大终端读身份证
   * @returns {{result: *, code: *}}
   * @constructor
   */
  terminalIReadMultiCard() {
    //先创建一个buffer 用来装结果
    var result1 = new Buffer(150);
    //获取结果，可以用异步方式
    var code = TerminalIDReader.iReadMultiCard("D:\\", result1);
    //返回的结果要进行转码，node.js 默认是utf-8 ,底层包的是gb2312，要转码
    var idCardData = iconv.decode(result1, "GBK");
    //把结果放入实体类
    var params = {
      code: code,
      result: idCardData
    };
    // console.log("TerminalCode", code);
    // console.log("TerminalIdCardData", idCardData);
    return params;
  }
};
