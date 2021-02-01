<template>
  <div class="infomain">
    <top-nav></top-nav>
    <div class="infoManage">
      <top-title title="信息管理"></top-title>
      <div class="box">
        <div class="left" @click="goto1()"></div>
        <div class="right" @click="goto2()"></div>
      </div>
    </div>
  </div>
</template>

<script>
import topNav from "@/components/TopNav";
import topTitle from "@/components/TopTitle";
export default {
  components: { topNav, topTitle },
  methods: {
    goto1() {
      this.$store.commit("ent/set_entType", "2");
      this.$router.push({ path: "/positionList" });
    },
    goto2() {
      this.$router.push({ path: "/entEditor" });
    }
  }
};
</script>

<style lang="scss">
.infoManage {
  padding: 2rem;
  background: url("~@/assets/imgs/bg.jpg") no-repeat center center;
  height: 64rem;
  background-size: 100% 100%;
  .box {
    width: 80%;
    margin: 10% auto 0;
    display: flex;
    justify-content: center;
    .left {
      width: 36rem;
      height: 24rem;
      background: url("~@/assets/imgs/zhiwei.png") no-repeat center center;
      background-size: 100% 100%;
      margin-right: 6rem;
    }
    .right {
      width: 36rem;
      height: 24rem;
      background: url("~@/assets/imgs/qiyejj.png") no-repeat center center;
      background-size: 100% 100%;
    }
  }
}
</style>
