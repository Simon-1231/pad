<template>
  <div>
    <top-nav></top-nav>
    <div class="positionDetail">
      <top-title title="职位详情"></top-title>
      <div class="boxdetail">
        <div class="title">
          {{ postDetail.name }}
          <p>{{ postDetail.salaryName }}</p>
        </div>
        <div class="list">
          学历要求：<span>{{ postDetail.educationName }}</span>
        </div>
        <div class="list">
          工作经验：<span>{{ postDetail.experienceName }}</span>
        </div>
        <div class="list">
          年龄要求：<span>{{ postDetail.ageRangeName }}</span>
        </div>
        <div class="list">
          招聘人数：<span>{{ postDetail.posts }}人</span>
        </div>
        <div class="list">
          工作地点：<span>{{ address }}</span>
        </div>
      </div>
      <div class="box">
        <div class="title">
          岗位描述
        </div>
        {{ postDetail.description }}
      </div>
      <div class="box">
        <div class="title">
          公司名称
        </div>
        {{ entInfo.name }}
      </div>
      <div class="btnbox">
        <div class="btn" @click="goresume">面试</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import topNav from "@/components/TopNav";
import topTitle from "@/components/TopTitle";
export default {
  name: "positionDetail",
  components: { topNav, topTitle },
  computed: {
    ...mapGetters(["postDetail", "entInfo"]),
    address() {
      return (
        this.postDetail.province +
        this.postDetail.city +
        this.postDetail.area +
        this.postDetail.address
      );
    }
  },
  created() {
    // this.id = this.$route.query.id;
  },
  methods: {
    goresume() {
      this.$store.commit("ent/set_isChosePost", 1);
      this.$router.push({
        path: "/checkResume"
      });
    }
  }
};
</script>

<style lang="scss">
.positionDetail {
  padding: 2rem;
  text-align: left;
  .boxdetail {
    margin-top: 2rem;
    margin-left: 5rem;
    .title {
      color: #4075c1;
      font-size: 2.8rem;
      margin-bottom: 1.2rem;
      p {
        float: right;
        margin-right: 20rem;
        font-size: 2.5rem;
        color: #f28814;
      }
    }
    .list {
      color: #797a7b;
      font-size: 1.8rem;
      margin-bottom: 1rem;
      span {
        margin-left: 1rem;
        color: #000;
      }
    }
  }
  .box {
    margin-top: 2rem;
    margin-left: 5rem;
    font-size: 2.2rem;
    .title {
      color: #4075c1;

      margin-bottom: 1rem;
    }
  }
  .btnbox {
    text-align: right;
    margin-top: 2rem;
    .btn {
      margin-right: 1rem;
      display: inline-block;
      width: 10rem;
      height: 5rem;
      right: 0;
      top: 6rem;
      text-align: center;
      line-height: 5rem;
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
