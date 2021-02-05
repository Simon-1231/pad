<template>
  <div class="home">
    <div class="form">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="账号密码登录" name="first">
          <accountLogin :exInfo="exInfo"></accountLogin>
        </el-tab-pane>
        <el-tab-pane label="身份证扫描登录" name="second">
          <idCardLogin
            :exInfo="exInfo"
            :activeName="activeName"
            @relogin="relogin"
          ></idCardLogin>
        </el-tab-pane>
        <el-tab-pane label="短信验证码登录" name="third">
          <sinCardLogin :exInfo="exInfo"></sinCardLogin>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import accountLogin from "./components/accountLogin";
import idCardLogin from "./components/idCardLogin";
import sinCardLogin from "./components/sinCardLogin";
import { padMac } from "./../../api/user.js";

let interfaces = require("os").networkInterfaces();
export default {
  name: "Login",
  components: { accountLogin, idCardLogin, sinCardLogin },
  data() {
    return {
      activeName: "first",
      mac: "",
      exInfo: {}
    };
  },
  created() {
    this.getSnByMac();
  },
  mounted() {
    // this.websocket();
  },
  methods: {
    relogin() {
      this.activeName = "first";
    },
    handleClick() {
      // console.log("e", this.activeName);
    },

    /**
     * 获取
     */
    getSnByMac() {
      var macList = interfaces;
      var macAddress = "";
      //根据是否是ipv4地址和其他条件判断获取真正的mac地址
      for (var name in macList) {
        var iface = macList[name];
        for (var i = 0; i < iface.length; i++) {
          var item = iface[i];
          if (
            item.family === "IPv4" &&
            item.address !== "127.0.0.1" &&
            !item.internal
          ) {
            macAddress = item.mac.toLocaleUpperCase();
            macAddress = macAddress.replace(/:/g, "-");
          }
        }
      }
      console.log("mac", macAddress);
      this.mac = macAddress;
      // this.exInfo = {
      //   // sn: 35,
      //   sn: this.sn || "",
      //   mac: this.mac || ""
      //   // sn: 25,
      //   // mac: "00-FF-11-93-99-AF"
      // };
      // this.$store.commit("user/SET_exInfo", this.exInfo);
      // macAddress = null;
      if (!macAddress) {
        this.$message.error("系统没有保存PAD mac地址");
        // this.getSnByMac();
      } else {
        padMac(macAddress)
          .then(res => {
            console.log(res);
            this.sn = res.data.sn || "";
            console.log("sn", this.sn);
            // this.$message.error(`sn: ${this.sn}"`);

            this.exInfo = {
              // sn: 35,
              sn: this.sn,
              mac: this.mac
              // sn: 25,
              // mac: "00-FF-11-93-99-AF"
            };
            this.$store.commit("user/SET_exInfo", this.exInfo);
            // console.log("sn store", this.$store.getters.sn);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
<style lang="scss">
.home {
  position: fixed;
  // left: 0;
  right: 0;
  top: 0;
  // bottom: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  .form {
    // width: 50%;
    // max-width: 500px;
    width: 50rem;
    // background: #fff;
    position: relative;
    top: 30%;
    // height: 250px;
    margin: -140px auto 0;
    .el-tabs {
      height: 28rem;
    }
    .el-tabs__nav {
      display: flex;
      width: 100%;
    }
    .el-tabs__item {
      flex: 1;
      height: 5rem;
      line-height: 5rem;
      font-size: 1.5rem;
    }
  }
  .close {
    margin-top: 30rem;
  }
}
</style>
