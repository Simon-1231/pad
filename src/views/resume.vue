<template>
  <div>
    <top-nav></top-nav>
    <div v-if="listData" class="resume">
      <top-title title="查看简历" @goout="goout" :resume="listData.intention">
        <div v-if="isshow" class="text">岗位：{{ postname }}</div>
        <div v-else class="text">未选择岗位</div>
      </top-title>
      <div class="content">
        <div class="left">
          <div class="box">
            <div class="item_title"><i></i>基本信息</div>
            <div class="item_info">
              <div class="left">姓名：</div>
              <div class="right">{{ listData.name }}</div>
            </div>
            <div class="item_info">
              <div class="left">性别：</div>
              <div class="right">{{ listData.sex | sextype }}</div>
            </div>
            <div class="item_info">
              <div class="left">身份证号：</div>
              <div class="right">{{ listData.idCard }}</div>
            </div>
            <div class="item_info">
              <div class="left">联系电话：</div>
              <div class="right">{{ listData.mobile }}</div>
            </div>
            <div class="item_info">
              <div class="left">当前状态：</div>
              <div class="right">{{ listData.personalStateName }}</div>
            </div>
            <div class="item_info">
              <div class="left">电子邮箱：</div>
              <div class="right">{{ listData.mail }}</div>
            </div>
            <div class="item_info">
              <div class="left">工作年限：</div>
              <div class="right">{{ listData.workYearName }}</div>
            </div>
          </div>
          <div class="box">
            <div class="item_title"><i></i>工作经验</div>
            <div class="item_info">
              <div class="right">{{ listData.workExperience }}</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="box">
            <div class="item_title"><i></i>求职意向</div>
            <div class="item_info">
              <div class="left">期望职位：</div>
              <div class="right">{{ listData.expectJobTypeName }}</div>
            </div>
            <div class="item_info">
              <div class="left">期望地区：</div>
              <div class="right">{{ address }}</div>
            </div>
            <div class="item_info">
              <div class="left">期望薪酬：</div>
              <div
                v-if="listData.hopeSalarySmall && listData.hopeSalaryBig"
                class="right"
              >
                {{ listData.hopeSalarySmall }}k-{{ listData.hopeSalaryBig }}k
              </div>
              <div v-else class="right">面议</div>
            </div>
          </div>
          <div class="box">
            <div class="item_title"><i></i>学历</div>
            <div class="item_info">
              <div class="left">群体类别：</div>
              <div class="right">{{ listData.educationName }}</div>
            </div>
            <div class="item_info">
              <div class="left">教育背景：</div>
              <div class="right">{{ listData.educationalBackground }}</div>
            </div>
          </div>
          <div class="box">
            <div class="item_title"><i></i>自我评价</div>
            <div class="item_info">
              <div class="right">{{ listData.selfEvaluation }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!listData.intention" class="btnbox">
        <div class="btn" @click="change(3, '拒绝')">拒绝</div>
        <div class="btn" @click="change(1, '待定/有意向')">待定/有意向</div>
        <div class="btn" @click="change(2, '录用')">录用</div>
      </div>
      <div v-else class="state">
        当前状态：{{ listData.intention | changeState }}
      </div>
      <el-dialog
        :visible.sync="dialogVisible"
        title="请选择面试岗位:"
        width="50%"
        :show-close="false"
        :loading="dialogLoad"
      >
        <div v-if="postList.length === 0" class="jiazai">
          加载中。。。。
        </div>
        <div v-else>
          <div
            class="list"
            v-for="(item, index) in postList"
            :key="index"
            @click="choosePost(item)"
          >
            <div class="p1">
              <span class="left">{{ item.name }}</span>
              <span class="right">{{ item.salaryName }}</span>
            </div>
            <!-- <div class="p2">
            <span>{{ item.keywordThreeName }}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ item.experienceName }}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ item.posts }}人</span>
          </div> -->
            <div class="p3">
              工作地点：{{ item.province + item.city + item.area }}
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div v-else class="resume">
      <top-title></top-title>
      <empty></empty>
    </div>
  </div>
</template>

<script>
import topNav from "@/components/TopNav";
import topTitle from "@/components/TopTitle";
import empty from "@/components/empty";
import { getResume, getPostList, entIntentionPerson } from "@/api/ent";
import { mapGetters } from "vuex";
export default {
  name: "resume",
  filters: {
    sextype(val) {
      return val === 1 ? "男" : "女";
    },
    changeState(val) {
      if (val === 3) return "拒绝";
      if (val === 1) return "待定/有意向";
      if (val === 2) return "录用";
    }
  },
  components: { topNav, topTitle, empty },
  computed: {
    ...mapGetters(["entInfo", "resumeInfo", "postDetail", "isChosePost"]),
    address() {
      return (
        this.listData.expectJobProvince +
        this.listData.expectJobCity +
        this.listData.expectJobArea
      );
    }
  },
  data() {
    return {
      listData: {},
      postname: "",
      isshow: true,
      postList: [],
      dialogVisible: false,
      dialogLoad: false
    };
  },
  created() {
    this.idCard = this.$route.query.idCard || "";
    this.postid = this.postDetail.id || "";
    if (this.isChosePost) {
      // 已选择岗位的情况
      console.log("已选职位");
      this.isshow = true;
      this.postname = this.postDetail.name;
      this._getresume();
    } else {
      console.log("未选职位");
      this.postid = "";
      // 未选择岗位的情况
      if (this.isEmptyObject(this.resumeInfo)) {
        // 扫描身份证查简历
        this._getresume();
      } else {
        // 输入身份证查简历
        this.listData = this.resumeInfo;
      }
      console.log("this.postname", this.listData);

      this.isshow = false;
    }
  },
  destroyed() {
    this.$store.commit("ent/set_postDetail", {});
  },
  methods: {
    goout() {
      if (!this.listData.intention) {
        this.$message.error("请选择意向");
      }
    },
    async _getresume() {
      const form = {
        // idCard: "445121199412283154",
        idCard: this.idCard,
        entId: this.entInfo.id,
        jobFairId: this.entInfo.jobFairId,
        positionId: this.postid
      };
      const res = await getResume(form).catch(err => console.log(err));
      if (res && res.code === 0) {
        this.listData = res.data;
      }
    },
    change(type, text) {
      this.$confirm(`确定${text}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.type = type;
          if (this.isshow) {
            // 已选择岗位的情况
            this._entIntentionPerson(this.postDetail);
          } else {
            // 未选择岗位的情况
            this._getPostList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    choosePost(item) {
      this._entIntentionPerson(item);
      this.dialogVisible = false;
    },
    // 点击意向后的接口
    _entIntentionPerson(item) {
      const form = {
        entId: this.entInfo.id,
        userId: this.listData.userId,
        jobfairId: this.entInfo.jobFairId,
        intention: this.type,
        positionId: item.id
      };
      this.postid = item.id;
      entIntentionPerson(form)
        .then(res => {
          if (res.code === 0) {
            this.$message.success("操作成功");
            this.postname = item.keywordThreeName;
            this.isshow = true;
            this._getresume();
          }
        })
        .catch(err => console.log(err));
    },
    // 获取职位列表
    async _getPostList() {
      this.dialogLoad = true;
      const form = {
        entId: this.entInfo.id,
        // entId: "430595157951598592",
        page: 1,
        size: 1000
      };
      this.dialogVisible = true;
      const res = await getPostList(form).catch(err => {
        console.log(err);
      });
      if (res && res.code === 0) {
        this.$nextTick(() => {
          this.postList = res.data.list;
          this.dialogLoad = false;
        });
      }
    },
    // 判断对象是否为空,for 循环一旦执行，就说明有属性
    isEmptyObject(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss">
.resume {
  padding: 2rem;
  .text {
    font-size: 3rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(48, 48, 48, 1);
    // display: inline-block;
    margin: 0 0 0 1rem;
    vertical-align: middle;
    float: right;
  }
  .btnbox {
    display: flex;
    // margin-top: 3rem;
  }
  .btn {
    margin-right: 1rem;
    // display: block;
    width: 10rem;
    height: 8rem;
    right: 0;
    top: 60px;
    text-align: center;
    line-height: 8rem;
    border-radius: 2.5rem;
    background: linear-gradient(
      -90deg,
      rgba(1, 207, 254, 1),
      rgba(0, 132, 255, 1)
    );
    font-size: 3rem;
    color: rgba(255, 254, 254, 1);
    margin-left: 2rem;
    flex: 1;
    font-weight: 600;
    // float: right;
  }
  .content {
    display: flex;
    .left {
      flex: 1;
    }
    .right {
      flex: 1;
    }
    .box {
      text-align: left;
      margin-bottom: 3.5rem;
      .item_title {
        color: #4075c1;
        font-size: 2rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
      }
      i {
        border-right: 6px solid #016ef2;
        border-radius: 1rem;
        margin-right: 1rem;
      }
      .item_info {
        color: #797a7b;
        font-size: 1.8rem;
        margin-bottom: 1rem;
        margin-left: 1rem;
        display: flex;
        .left {
          flex: 1;
        }
        .right {
          flex: 3;
          color: #000;
        }
      }
    }
  }
  .el-dialog {
    padding-bottom: 2rem;
    background-color: #c0c0c0;
    .el-divider {
      background-color: #000;
    }
    .el-dialog__header {
      text-align: left;
    }
    .el-dialog__title {
      font-size: 3rem;
      font-weight: 600;
    }
    .el-dialog__body {
      padding: 2rem;
      height: 50rem;
      overflow-y: scroll;
    }
    .list {
      background-color: #fff;
      margin-bottom: 2rem;
      padding: 1rem;
      font-size: 2rem;
      text-align: left;
      .p1 {
        display: flex;
        .left {
          flex: 1;
          text-align: left;
        }
        .right {
          flex: 1;
          text-align: right;
        }
      }
      .p3 {
        margin-top: 1rem;
      }
    }
  }
  .state {
    font-size: 3rem;
    color: #4075c1;
    margin-top: 20px;
  }
  .jiazai {
    font-size: 3rem;
  }
}
</style>
