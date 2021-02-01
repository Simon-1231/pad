const { ipcRenderer } = require("electron");

import common from "./../common/IpcCommon";

const ipcService = Object.create(null);

var callbackData = {};

ipcService.install = Vue => {
  Vue.prototype.$ipcRenderer = {
    /**
     * 发送数据到分屏
     * @param msgData
     */
    sendToExtension: msgData => {
      ipcRenderer.send(common.CC_MAIN_MSG, msgData);
    },
    /**
     * 监听是否主屏幕发送消息过来（放到mounted 里面使用）
     * @param callback
     */
    onMainMsg: callback => {
      ipcRenderer.on(common.CC_MAIN_MSG, (event, args) => {
        console.log("onMainMsg callback", event, args);
        callbackData = { args, callback };
        callbackData.callback && callbackData.callback(args);
      });
    },
    /**
     * 发送消息到主屏幕
     * @param msgData
     */
    sendToMain: msgData => {
      ipcRenderer.send(common.CC_EXTENSION_MSG, msgData);
    },
    /**
     * 监听分屏是否发送信息过来（放在mounted 方法里面使用）
     * @param callback
     */
    onExtensionMsg: callback => {
      ipcRenderer.on(common.CC_EXTENSION_MSG, (event, args) => {
        callbackData = { args, callback };
        callbackData.callback && callbackData.callback(args);
      });
    },
    detach: () => {
      callbackData = {};
    }
  };
};

export default ipcService;
