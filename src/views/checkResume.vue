<template>
  <div>
    <top-nav></top-nav>
    <div class="checkResume">
      <top-title title="简历查询" @goout="goout"></top-title>
      <div class="check">
        <img src="~@/assets/imgs/read_card.png" alt="" />
        <p>请求职者刷身份证获取简历</p>
      </div>
      <el-row :gutter="20" class="buttom">
        <el-col :span="12">
          <img
            src="~@/assets/imgs/ewm.jpg"
            alt="扫描二维码进入小程序完善简历"
          />
        </el-col>
        <el-col :span="12">
          <div class="btn" @click="noidcard">
            无身份证/无线上简历
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      class="dialog"
      :visible.sync="dialogFormVisible"
      center
      top="5vh"
      @close="closedialog"
    >
      <el-form ref="Form" class="Form" :model="form" :rules="rules">
        <el-form-item
          label="身份证号"
          :label-width="formLabelWidth"
          prop="idCard"
        >
          <el-input
            type="text"
            v-model="form.idCard"
            data-mode="en_let"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input
            v-model="form.name"
            data-mode="en_let"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input
            v-model="form.phone"
            data-mode="en_let"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm('Form')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :show-close="false"
      :close-on-click-modal="false"
      center
    >
      <span> 系统查询到简历信息，请查看！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goconfirm">确 定</el-button>
      </span>
    </el-dialog>
    <vue-dusion-keyboard
      float
      observer
      class="my-keyboard"
    ></vue-dusion-keyboard>
  </div>
</template>

<script>
import IDCardReader from "@/IDCardReader";
import topNav from "@/components/TopNav";
import topTitle from "@/components/TopTitle";
import { addOrGetResume } from "@/api/ent";
import { mapGetters } from "vuex";
import { checkId, checkPhoneNum } from "@/utils";
export default {
  name: "CheckResume",
  components: { topNav, topTitle },
  computed: {
    ...mapGetters(["entInfo"])
  },
  data() {
    var valiIdCard = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入身份证号"));
      } else if (!checkId(value)) {
        callback(new Error("身份证号格式错误"));
      } else {
        callback();
      }
    };

    var valiPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请入输手机号"));
      } else if (!checkPhoneNum(value)) {
        callback(new Error("请输入完整手机号码"));
      } else {
        callback();
      }
    };

    return {
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        idCard: "",
        phone: "",
        name: "",
        entId: ""
      },
      formLabelWidth: "100px",
      rules: {
        idCard: [{ required: true, validator: valiIdCard, trigger: "blur" }],
        name: [{ required: true, message: "请入输姓名", trigger: "blur" }],
        phone: [{ required: true, validator: valiPhone, trigger: "blur" }]
      }
    };
  },
  created() {
    this.form.entId = this.entInfo.id;
    this.timer = setInterval(() => {
      this.readIDCard();
    }, 1500);
  },
  beforeDestroy() {
    console.log("销毁");
    this.clearInter();
  },
  methods: {
    goout() {
      // console.log("返回");
      // this.clearInter();
    },
    closedialog() {
      this.timer = setInterval(() => {
        this.readIDCard();
      }, 1500);
    },
    noidcard() {
      this.clearInter();
      this.dialogFormVisible = true;
    },
    clearInter() {
      clearInterval(this.timer);
      this.timer = null;
    },
    readIDCard() {
      // try {
      var params = IDCardReader.iReadMultiCard();
      var code = params.code;
      console.log("params", params, code);
      var result = params.result || "";
      if (code === 0) {
        this.loading = this.$loading({
          lock: true,
          text: "身份证检测中。。。",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.clearInter();
        this.$message.success("读取身份证成功");
        this.sfzh = result.split("|")[5];
        setTimeout(() => {
          setTimeout(() => {
            this.loading.close();
          }, 2000);
          this.$router.push({
            path: "/resume",
            query: { idCard: this.sfzh }
          });
        }, 2000);
      } else {
        if (this.loading) {
          setTimeout(() => {
            this.loading.close();
          }, 2000);
        }
        // this.clearInter();
      }
    },
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addOrGetResume(this.form)
            .then(res => {
              if (res.code === 0 && res.data) {
                this.dialogVisible = true;
                this.resumeData = res.data;
                // this.goconfirm(res.data);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goconfirm() {
      console.log("resumeData", this.resumeData);
      this.$store.commit("ent/set_resume", this.resumeData);
      this.$router.push({
        path: "/resume",
        query: { idCard: this.form.idCard }
      });
      this.dialogFormVisible = false;
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss">
@import "~@/common/css/keyboard";
.checkResume {
  padding: 2rem;
  font-size: 2rem;
  font-weight: bold;
  .buttom {
    height: 20rem;
    margin-top: 2rem;
    img {
      display: inline-block;
      width: 50%;
    }
  }
  .btn {
    margin-top: 5rem;
    margin-right: 1rem;
    display: inline-block;
    width: 25rem;
    height: 10rem;
    right: 0;
    top: 60px;
    text-align: center;
    line-height: 10rem;
    border-radius: 3rem;
    background: linear-gradient(
      -90deg,
      rgba(1, 207, 254, 1),
      rgba(0, 132, 255, 1)
    );
    font-size: 2rem;
    color: rgba(255, 254, 254, 1);
  }
  .el-form-item__label,
  .el-form-item__content {
    font-size: 1.6rem;
  }
  .el-dialog__footer {
    text-align: center;
  }
}
</style>
