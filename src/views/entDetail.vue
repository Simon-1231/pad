<template>
  <div>
    <top-nav></top-nav>
    <div class="entDetail">
      <top-title title="企业详情"></top-title>
      <div class="boxdetail">
        <div class="title">
          {{ entdetail.name }}
        </div>
        <div class="list">
          公司行业：<span>{{ entdetail.category }}</span>
        </div>
        <div class="list">
          公司规模：<span>{{ entdetail.scale }}</span>
        </div>
        <div class="list">
          公司地址：<span>{{ address }}</span>
        </div>
        <div class="list">
          详细地址：<span>{{ entdetail.address }}</span>
        </div>
      </div>
      <div class="box">
        <div class="title">
          公司简介
        </div>
        {{ entdetail.introduction }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getEntById } from "@/api/ent";
import topNav from "@/components/TopNav";
import topTitle from "@/components/TopTitle";
export default {
  components: { topNav, topTitle },
  computed: {
    ...mapGetters(["entInfo"]),
    address() {
      return this.entInfo.province + this.entInfo.city + this.entInfo.area;
    }
  },
  data() {
    return {
      entdetail: {}
    };
  },
  created() {
    this.id = this.entInfo.id;
    console.log(this.id);
    this._getEntById(this.id);
  },
  methods: {
    async _getEntById(id) {
      const res = await getEntById({ id }).catch(err => console.log(err));
      if (res.code === 0) {
        this.entdetail = res.data;
      }
    }
  }
};
</script>

<style lang="scss">
.entDetail {
  padding: 2rem;
  text-align: left;
  .boxdetail {
    margin-top: 2rem;
    .title {
      color: #4075c1;
      font-size: 2.8rem;
      margin-bottom: 1.2rem;
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
    margin-top: 20px;
    font-size: 2.2rem;
    .title {
      color: #4075c1;
      margin-bottom: 12px;
    }
  }
}
</style>
