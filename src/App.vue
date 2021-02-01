<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <!--<router-link to="/">Home</router-link> |-->
    <!--<router-link to="/about">About</router-link>-->
    <!-- </div> -->
    <keep-alive :exclude="excludeList">
      <router-view />
    </keep-alive>
    <el-dialog
      title="正在更新新版本,请稍候..."
      :visible.sync="dialogVisible"
      width="60%"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :show-close="showClose"
      center
    >
      <div style="width:100%;height:20vh;line-height:20vh;text-align:center">
        <el-progress
          status="success"
          :text-inside="true"
          :stroke-width="20"
          :percentage="percentage"
          :width="strokeWidth"
          :show-text="true"
        ></el-progress>
      </div>
    </el-dialog>

    <!-- <vue-dusion-keyboard all observer class="my-keyboard"></vue-dusion-keyboard> -->
  </div>
</template>

<script>
// const { exec } = require("child_process");
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["exInfo"])
  },
  watch: {
    // exInfo(val) {
    //   this.initWebSocket(val.mac);
    // }
  },
  data() {
    return {
      excludeList: [
        "Login",
        "positionList",
        "resume",
        "postEditor",
        "entEditor",
        "CheckResume",
        "toptitle"
      ],
      dialogVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      showClose: false,
      percentage: 0,
      strokeWidth: 200
    };
  },
  created() {
    // if (this.websock) {
    //   this.websock.websocketclose(); // 关闭websocket连接
    // }
  },
  destroyed() {
    // if (this.websock) {
    //   this.websock.websocketclose(); // 关闭websocket
    //   this.clearTime();
    // }
  },
  methods: {
    initWebSocket(mac) {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持WebSocket");
        return false;
      }
      console.log("mac111111", mac);
      this.wsuri = `ws://192.168.4.43:17093/websocket/${mac}`; // websocket地址
      // this.wsuri = `ws://192.168.4.43:17093/websocket/test`;
      this.websock = new WebSocket(this.wsuri);
      this.websock.onopen = this.websocketonopen;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    // 重新连接
    reconnect() {
      //没连接上会一直重连，设置延迟避免请求过多
      if (this.type) return; // 设置type,防止5s内重复触发reconnect
      this.type = true;
      this.timer = setInterval(() => {
        this.initWebSocket(this.exInfo.mac);
        this.type = false;
      }, 5000);
    },
    // 清除定时器
    clearTime() {
      console.log("进入定时器");
      if (this.timer) {
        console.log("关闭定时器");
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    // 连接成功
    websocketonopen() {
      console.log("WebSocket连接成功");
      this.clearTime();
    },
    // 退出连接
    websocketclose() {
      console.log("退出连接");
      this.reconnect(); // 退出连接后尝试重新连接
    },
    // 接收消息
    websocketonmessage(event) {
      console.log("收到消息" + event.data);
      // if (event.data === "shutDown") {
      //   exec("shutdown /s /t 3600");
      // } else {
      //   exec("shutdown /a");
      // }
    },
    // 连接出错
    websocketonerror() {
      console.log("连接出错");
      this.reconnect(); // 连接失败后尝试重新连接
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@media only screen and (max-width: 1280px),
  only screen and (max-device-width: 1280px) {
  html,
  body {
    font-size: 13.5px;
  }
}
@media only screen and (max-width: 1080px),
  only screen and (max-device-width: 1080px) {
  html,
  body {
    font-size: 10px;
  }
}
// p {
//   margin: 0;
// }

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
