<template>
  <div class="home">
    <div class="left">
      <div class="top box">
        <div class="title">{{ exInfo.ent.name }}</div>
        <div class="title1">企业简介</div>
        <div class="content">
          {{ exInfo.ent.introduction }}
        </div>
      </div>
      <div class="bottom box">
        <div class="left">
          <div class="title">联系人信息</div>
          <div class="p">联络人：{{ entInfo.contactPerson }}</div>
          <div class="p">联系电话：{{ entInfo.tel }}</div>
        </div>
        <div class="right">
          <div class="text">立即投递</div>
          <img src="~@/assets/imgs/ewm.jpg" alt="" />
        </div>
      </div>
    </div>
    <div class="right box">
      <div class="title1">
        招聘岗位
      </div>
      <div class="list_title">
        <div class="label1">职位名信息</div>
        <div class="label2">薪资</div>
      </div>
      <!-- <div class="list_box"> -->
      <vue-seamless-scroll
        class="list_box"
        :data="jobList"
        :class-option="optionSetting"
      >
        <div class="anim">
          <div class="list" v-for="(item, index) in jobList" :key="index">
            <div class="p1">
              <span class="span1">{{ item.name }}</span>
              <el-divider direction="vertical"></el-divider>
              <span class="span2">{{ item.posts }}人</span>
              <el-divider direction="vertical"></el-divider>
              <span class="span3">{{ item.experienceName }}</span>
              <span class="span4">{{ item.salaryName }}</span>
            </div>
            <div class="p2">
              {{ item.description }}
            </div>
            <el-divider></el-divider>
          </div>
        </div>
      </vue-seamless-scroll>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { screenIndex } from "@/api/ent";
import { getPostList } from "@/api/ent";
export default {
  data() {
    return {
      optionSetting: {
        step: 0.1, // 滚动速度
        openWatch: true
      },
      entInfo: {},
      jobList: []
    };
  },
  created() {
    this.exInfo = this.$route.query.exInfo;
    console.log("exInfo", this.exInfo);
    this._screenIndex();
    this._getPostList(this.exInfo);
  },
  mounted() {
    this.$ipcRenderer.onMainMsg(data => {
      console.log("退出", data);
      if (data === "退出登录") {
        this.$router.push({ path: "/" });
      }
    });
  },
  methods: {
    async _screenIndex() {
      const { sn, mac } = this.exInfo;
      const form = {
        sn,
        mac
      };
      const res = await screenIndex(form).catch(err => console.log(err));
      if (res && res.code === 0) {
        this.entInfo = res.data;
      }
    },
    async _getPostList(exInfo) {
      const form = {
        entId: exInfo.ent.id,
        name: "",
        page: 1,
        size: 1000
      };
      const res = await getPostList(form).catch(err => console.log(err));
      if (res && res.code === 0) {
        this.jobList = res.data.list;
      }
    }
  }
};
</script>

<style lang="scss">
.home {
  background: url("~@/assets/extimgs/bg.jpg") no-repeat center center;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 2rem;
  // justify-content: space-between;
  box-sizing: border-box;
  .box {
    padding: 2rem;
    box-sizing: border-box;
  }
  .title1 {
    font-size: 4rem;
    color: #1679ff;
    font-weight: bold;
  }
  .left {
    // flex: 1;
    margin-right: 2rem;
    width: 40%;
    .top {
      height: 70%;
      background-color: #fff;
      margin-bottom: 2rem;
      .title {
        font-size: 4.8rem;
        color: #303030;
        // text-align: center;
        font-weight: bold;
        margin-bottom: 2rem;
      }

      .content {
        font-size: 2.8rem;
        font-weight: 500;
        color: #303030;
        margin-top: 2rem;
        overflow-y: scroll;
      }
    }
    .bottom {
      height: 28%;
      background-color: #fff;
      display: flex;
      .left {
        flex: 2;
        .title {
          font-size: 3.6rem;
          font-weight: bold;
          margin-top: 2rem;
        }
        .p {
          font-size: 3rem;
          color: #303030;
          font-weight: 500;
          margin-top: 2rem;
        }
      }
      .right {
        flex: 1;
        .text {
          font-size: 3rem;
          color: #f36202;
          font-weight: 600;
        }
        img {
          height: 20rem;
          margin-top: 1rem;
        }
      }
    }
  }
  .right {
    // flex: 1;
    width: 60%;
    background-color: #fff;
    .list_title {
      display: flex;
      font-size: 4rem;
      font-weight: bold;
      margin-top: 1rem;
      .label1 {
        flex: 2;
      }
      .label2 {
        flex: 1;
        text-align: right;
        margin-right: 2rem;
      }
    }
    .list_box {
      overflow: hidden;
      height: 86rem;
      margin-top: 2rem;
      .anim {
        width: 100%;
      }
      .list {
        margin-top: 2rem;
        .p1 {
          font-size: 3rem;
          span {
            margin: 0 2rem;
          }
          .span1 {
            color: #1679ff;
            font-weight: 500;
          }
          .span4 {
            float: right;
            margin-right: 2rem;
            color: #f36202;
            font-size: 3.6rem;
          }
        }
        .p2 {
          font-size: 3rem;
          margin: 2rem 0;
        }
      }
    }
  }
}
</style>
