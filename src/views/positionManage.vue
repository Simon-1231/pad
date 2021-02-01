<template>
  <div>
    <top-nav></top-nav>
    <div class="positionList">
      <top-title title="职位管理">
        <input
          id="search"
          v-model="form.name"
          placeholder="请输入要查找的职位"
        />
        <div class="btn">搜索</div>
        <div class="btn">重置</div>
      </top-title>
      <el-card class="list" v-for="(item, index) in listData" :key="index">
        <div class="listbox">
          <div class="left">
            <div class="p1">{{ item.a }}</div>
            <div class="p2">
              <span>招{{ item.b }}名</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ item.c }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ item.d }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ item.e }}</span>
              <p class="sala">
                薪资范围：<span>{{ item.f }}</span>
              </p>
            </div>
          </div>
          <div class="right">
            <button @click="goDetail">编辑职位</button>
          </div>
        </div>
      </el-card>
      <div class="page">
        <button class="left">上一页</button>
        <button class="right">下一页</button>
      </div>
    </div>
  </div>
</template>

<script>
import topNav from "@/components/TopNav";
import topTitle from "@/components/TopTitle";
export default {
  components: { topNav, topTitle },
  data() {
    return {
      form: {
        name: ""
      },
      listData: [
        {
          a: "java开发",
          b: 2,
          c: "初中",
          d: "应届生",
          e: "18~22岁",
          f: "12k~13k"
        },
        {
          a: "java开发",
          b: 2,
          c: "初中",
          d: "应届生",
          e: "18~22岁",
          f: "12k~13k"
        },
        {
          a: "java开发",
          b: 2,
          c: "初中",
          d: "应届生",
          e: "18~22岁",
          f: "12k~13k"
        }
      ]
    };
  },
  methods: {
    goDetail() {
      this.$router.push({ path: "/postEditor" });
    }
  }
};
</script>

<style lang="scss">
.positionList {
  padding: 2rem;
  #search {
    width: 30rem;
    height: 6rem;
    border: 1px solid rgba(143, 143, 143, 1);
    border-radius: 3rem;
    font-size: 2rem;
    padding-left: 1rem;
    margin-left: 2rem;
  }
  .btn {
    margin-right: 1rem;
    display: inline-block;
    width: 10rem;
    height: 5rem;
    right: 0;
    top: 60px;
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
    margin-left: 2rem;
  }
  .list {
    margin-top: 1rem;
    // padding: 10px 20px;
    border-radius: 15px;
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
          font-size: 2rem;
          margin-bottom: 1rem;

          .sala {
            margin-left: 2rem;
            display: inline-block;
            span {
              color: #ff9b41;
            }
          }
          .el-divider {
            margin: 0 2rem;
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
          font-size: 1.5rem;
        }
      }
    }
  }
  .page {
    width: 350px;
    margin: 0 auto;
    margin-top: 20px;
    /* margin-top: 100px; */
    display: flex;
    button {
      // background: #eca305;
      border: none;
      border-radius: 25px;
      padding: 8px 25px;
      color: #fff;
      font-size: 28px;
    }
    .left {
      margin-right: 50px;
      background: #cbcbcb;
    }
    .right {
      background: #ff8402;
    }
  }
}
</style>
