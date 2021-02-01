<template>
  <div class="topmain">
    <div class="left">毕节市-{{ entInfo.name }}</div>
    <div class="right">
      <p>{{ time }}</p>
      <div class="btn" type="primary" round @click="signOut">退出</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["entInfo"])
  },
  data() {
    return {
      time: "",
      timer: null
    };
  },
  created() {
    this.getTime();
    this.timer = setInterval(this.getTime, 1000);
  },

  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },

  methods: {
    signOut() {
      this.$store.commit("user/set_entInfo", "");
      this.$store.commit("ent/set_postDetail", "");
      this.$store.commit("ent/set_entType", "");
      this.$store.commit("ent/set_resume", "");
      this.$ipcRenderer.sendToExtension("退出登录");
      this.$router.push({ path: "/" });
    },
    getTime() {
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth();
      var date = now.getDate();
      var day = now.getDay();
      var hour = now.getHours();
      var minu = now.getMinutes();
      var sec = now.getSeconds();
      var week;
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      if (hour < 10) hour = "0" + hour;
      if (minu < 10) minu = "0" + minu;
      if (sec < 10) sec = "0" + sec;
      var arr_week = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      week = arr_week[day];
      this.time =
        year +
        " -" +
        month +
        " -" +
        date +
        " " +
        week +
        " " +
        hour +
        ":" +
        minu +
        ":" +
        sec;
    }
  }
};
</script>

<style lang="scss">
.topmain {
  display: flex;
  height: 8rem;
  line-height: 8rem;
  box-shadow: 0px 6px 6px 0px rgba(193, 193, 193, 0.3);
  .left {
    flex: 1;
    font-size: 3rem;
    font-weight: bold;
    color: rgba(48, 48, 48, 1);
    text-align: left;
    padding-left: 20px;
  }
  .right {
    flex: 1;
    text-align: right;
    font-size: 2rem;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    p {
      display: inline-block;
      margin-right: 10px;
    }
    .btn {
      margin-right: 1rem;
      display: inline-block;
      width: 8rem;
      height: 4rem;
      right: 0;
      top: 6rem;
      text-align: center;
      line-height: 4rem;
      border-radius: 3rem;
      background: linear-gradient(
        -90deg,
        rgba(1, 207, 254, 1),
        rgba(0, 132, 255, 1)
      );
      font-size: 2rem;
      color: rgba(255, 254, 254, 1);
    }
  }
}
</style>
