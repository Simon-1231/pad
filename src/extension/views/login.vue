<template>
  <div class="login">
    <div class="text">关注此企业</div>
    <div class="img"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$ipcRenderer.onMainMsg(data => {
      if (data.ent && data.ent.id) {
        this.exInfo = data;
        this.gohome(this.exInfo);
      }
      console.log("data", data);

      // if (data) {
      //   this.name = data.username;
      //   this.password = data.password;
      // }
    });
  },
  methods: {
    gohome(exInfo) {
      this.$router.push({ path: "/home", query: { exInfo } });
    }
  }
};
</script>

<style lang="scss">
.login {
  text-align: center;
}
.text {
  font-size: 6rem;
  display: inline-block;
  margin-top: 10%;
}
.img {
  width: 40rem;
  height: 40rem;
  margin: 5% auto 0;
  // display: inline-block;
  background: url("~@/assets/imgs/ewm.jpg") no-repeat center center;
  background-size: 100% 100%;
}
</style>
