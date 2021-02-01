<template>
  <div>
    <top-nav></top-nav>
    <div class="first">
      <div class="left">
        <img src="~@/assets/imgs/home.jpg" alt="" />
        <div class="box">
          <div class="title">企业简介</div>
          <div class="content">
            {{ entInfo.introduction }}
          </div>
        </div>
      </div>
      <div class="right">
        <div class="btn btn1" @click="go1()">企业详情</div>
        <div class="btn btn2" @click="go2()">职位列表</div>
        <div class="btn btn3" @click="go3()">简历查询</div>
        <div class="btn btn4" @click="go4()">信息管理</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import topNav from "@/components/TopNav";
export default {
  components: { topNav },
  computed: {
    ...mapGetters(["entInfo"])
  },
  methods: {
    go1() {
      this.$router.push({ path: "/entDetail" });
    },
    go2() {
      this.$store.commit("ent/set_entType", "1");
      this.$router.push({ path: "/positionList" });
    },
    go3() {
      this.$store.commit("ent/set_isChosePost", 0);
      this.$router.push({ path: "/checkResume" });
    },
    go4() {
      this.$router.push({ path: "/infoManage" });
    }
  }
};
</script>

<style lang="scss">
.first {
  padding: 20px;
  // margin-top: 0.5rem;
  display: flex;
  .left {
    flex: 2;
    img {
      width: 90%;
      height: 35rem;
      object-fit: cover;
    }
    .box {
      height: 20rem;
      padding: 20px;
      box-sizing: border-box;
      .title {
        font-weight: bold;
        font-size: 3rem;
        margin: 0;
        text-align: left;
      }
      .content {
        margin-top: 10px;
        height: 13rem;
        overflow-y: scroll;
        font-size: 1.5rem;
      }
    }
  }
  .right {
    flex: 1;
    .btn {
      width: 90%;
      /* width: 435px; */
      height: 13rem;
      margin: 0 auto 5%;
      /* border: 1px solid #2C59AA; */
      // box-shadow: 0px 0.2rem 0.4rem 0px rgba(0, 84, 177, 0.62);
      border-radius: 1.5rem 1.5rem 1.5rem 1.5rem;
      font-size: 4rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      line-height: 13rem;
    }
    .btn1 {
      background: url("~@/assets/imgs/button1.png") no-repeat center;
      background-size: 100% 100%;
    }
    .btn2 {
      background: url("~@/assets/imgs/button2.png") no-repeat center;
      background-size: 100% 100%;
    }
    .btn3 {
      background: url("~@/assets/imgs/button3.png") no-repeat center;
      background-size: 100% 100%;
    }
    .btn4 {
      background: url("~@/assets/imgs/button4.png") no-repeat center;
      background-size: 100% 100%;
    }
  }
}
</style>
