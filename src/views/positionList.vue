<template>
  <div>
    <top-nav></top-nav>
    <div v-if="show" class="positionList">
      <top-title title="职位列表">
        <input
          id="search"
          v-model="form.name"
          placeholder="请输入要查找的职位"
          data-mode="en_cap"
        />
        <div class="btn" @click="search">搜索</div>
        <div class="btn" @click="reset">重置</div>
      </top-title>
      <el-card class="list" v-for="(item, index) in listData" :key="index">
        <div class="listbox">
          <div class="left">
            <div class="p1">{{ item.name }}</div>
            <div class="p2">
              <span>招{{ item.posts }}名</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ item.educationName }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ item.experienceName }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ item.e }}</span>
              <!-- <p class="sala">
                薪资范围：<span>{{
                  item.salaryBegin + "~" + item.salaryEnd
                }}</span>
              </p> -->
              <p class="sala">
                薪资范围：<span>{{ item.salaryName | salaryName }}</span>
              </p>
            </div>
          </div>
          <div class="right">
            <button
              v-if="entType === '1'"
              @click="goDetail(item, '/positionDetail', item.id, item.name)"
            >
              详情
            </button>
            <button
              v-else
              @click="goDetail(item, '/postEditor', item.id, item.name)"
            >
              编辑职位
            </button>
          </div>
        </div>
      </el-card>
      <div class="page">
        <button class="left" :class="{ active: active1 }" @click="pro">
          上一页
        </button>
        <button class="right" :class="{ active: active2 }" @click="next">
          下一页
        </button>
      </div>
    </div>
    <div v-else class="positionList">
      <top-title></top-title>
      <empty></empty>
    </div>
    <vue-dusion-keyboard float class="my-keyboard"></vue-dusion-keyboard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getPostList } from "@/api/ent";
import topNav from "@/components/TopNav";
import topTitle from "@/components/TopTitle";
import empty from "@/components/empty";
export default {
  name: "positionList",
  components: { topNav, topTitle, empty },
  computed: {
    ...mapGetters(["entInfo", "entType"])
  },
  filters: {
    salaryName(val) {
      return val || "面议";
    }
  },
  created() {
    this.id = this.entInfo.id;
    this._getPostList();
  },
  data() {
    return {
      type: "",
      form: {
        name: ""
      },
      page: 1,
      size: 3,
      total: 0,
      listData: [],
      show: true,
      active1: false,
      active2: true
    };
  },
  methods: {
    search() {
      this._getPostList();
    },
    reset() {
      this.form.name = "";
      this._getPostList();
    },
    pro() {
      if (!this.active1) {
        return;
      }
      this.page--;
      this._getPostList();
    },
    next() {
      if (!this.active2) {
        return;
      }
      this.page++;
      this._getPostList();
    },
    goDetail(item, path, id, name) {
      this.$store.commit("ent/set_postDetail", item);
      this.$router.push({ path, query: { id, name } });
    },
    async _getPostList() {
      const form = Object.assign(this.form, {
        // entId: "495892504868376576",
        entId: this.entInfo.id,
        page: this.page,
        size: this.size
      });
      const res = await getPostList(form).catch(err => {
        this.show = false;
        console.log(err);
      });
      if (res && res.code === 0) {
        this.listData = res.data.list;
        this.total = res.data.total;
        // if (this.listData.length < 3) {
        //   this.active2 = false;
        // }
        this.active1 = this.page > 1 ? true : false;
        this.active2 = this.total - this.page * this.size > 0 ? true : false;
        // console.log(this.listData);
      } else {
        this.show = false;
      }
    }
  }
};
</script>

<style lang="scss">
@import "~@/common/css/keyboard";
.positionList {
  padding: 20px;
  #search {
    width: 30rem;
    height: 4.5rem;
    border: 1px solid rgba(143, 143, 143, 1);
    border-radius: 30px;
    font-size: 24px;
    padding-left: 1rem;
    margin-left: 2rem;
  }
  .btn {
    margin-right: 10px;
    display: inline-block;
    width: 100px;
    height: 50px;
    right: 0;
    top: 60px;
    text-align: center;
    line-height: 50px;
    border-radius: 30px;
    background: linear-gradient(
      -90deg,
      rgba(1, 207, 254, 1),
      rgba(0, 132, 255, 1)
    );
    font-size: 26px;
    color: rgba(255, 254, 254, 1);
    margin-left: 2rem;
  }
  .list {
    margin-top: 1rem;
    // padding: 10px 20px;
    border-radius: 1.5rem;
    // height: 120px;
    .listbox {
      display: flex;
      text-align: left;
      .left {
        flex: 5;
        .p1 {
          color: #237af3;
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .p2 {
          font-size: 2.6rem;
          margin-bottom: 1rem;

          .sala {
            margin-left: 2rem;
            display: inline-block;
            span {
              color: #ff9b41;
            }
          }
          .el-divider {
            margin: 0 20px;
            background: #000;
          }
        }
      }
      .right {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          background: #016ff3;
          border: none;
          border-radius: 2rem;
          padding: 8px 25px;
          color: #fff;
          font-size: 1.8rem;
        }
      }
    }
  }
  .page {
    width: 35rem;
    margin: 0 auto;
    margin-top: 2rem;
    /* margin-top: 100px; */
    display: flex;
    button {
      // background: #eca305;
      border: none;
      border-radius: 2.5rem;
      padding: 8px 25px;
      color: #fff;
      font-size: 2.8rem;
      background: #cbcbcb;
    }
    .left {
      margin-right: 5rem;
      background: #cbcbcb;
    }
    .active {
      background: #ff8402;
    }
    // .right {
    //   background: #ff8402;
    // }
  }
}
</style>
