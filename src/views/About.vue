<template>
  <div class="about">
    <div class="about-contain">
      <span class="about-item">登录名称：{{ name }}</span>
      <span class="about-item">登录密码：{{ password }}</span>
      <el-button type="primary" style="width:200px" v-on:click="loginOut"
        >登出</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "About",
  components: {},
  data() {
    return {
      name: "",
      password: ""
    };
  },
  /**
   * 页面创建
   */
  created() {},
  mounted() {
    // this.$electron.ipcRenderer.on(this.$common.CC_MAIN_MSG, (event, obj) => {
    //   console.log("ipcRenderer About", obj);
    //   this.name = obj.username;
    //   this.password = obj.password;
    // });
    this.$ipcRenderer.onMainMsg(data => {
      console.log("data", data);
      if (data) {
        this.name = data.username;
        this.password = data.password;
      }
    });
  },
  methods: {
    /**
     * 登出
     */
    loginOut() {
      // this.$electron.ipcRenderer.send(this.$common.CC_EXTENSION_MSG, "登出");
      this.$ipcRenderer.sendToMain({
        type: "登出",
        list: [this.name, this.password]
      });
      this.name = "";
      this.password = "";
    }
  }
};
</script>
<style>
.about-contain {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
.about-item {
  margin: 10px;
}
</style>
