<template>
  <div class="main">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="11rem"
      class="demo-ruleForm"
    >
      <el-form-item label="请输手机号码" prop="phone">
        <el-input
          type="text"
          v-model="ruleForm.phone"
          data-mode="en_cap"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="请输入验证码" prop="code">
        <el-input
          type="password"
          v-model="ruleForm.code"
          data-mode="en_cap"
          auto-complete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button class="yzm" type="primary" :loading="loading" @click="getyzm">
      获取验证码
    </el-button>
    <div class="sub">
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
    <vue-dusion-keyboard float class="my-keyboard"></vue-dusion-keyboard>
  </div>
</template>

<script>
import { verCode, loginByPhone } from "@/api/user";
import { checkPhoneNum } from "@/utils";
export default {
  props: {
    exInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
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
      rules: {
        phone: [{ required: true, validator: valiPhone, trigger: "blur" }],
        code: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      ruleForm: {
        phone: "",
        code: ""
      },
      loading: false
    };
  },
  /**
   * 页面创建
   */
  created() {},
  mounted() {
    this.$ipcRenderer.onExtensionMsg(data => {
      console.log("data", data);
      this.ruleForm.username = "";
      this.ruleForm.password = "";
      this.$message({
        message: JSON.stringify(data),
        type: "success"
      });
    });
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getyzm() {
      this.loading = true;
      verCode({ phone: this.ruleForm.phone, smsType: 14 })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          this.$message.error("获取验证码失败，请稍后再试！");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * 登录
     */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const form = Object.assign({ sn: this.exInfo.sn }, this.ruleForm);
          console.log("form", form);
          loginByPhone(form)
            .then(res => {
              if (res.code === 0 && res.data) {
                this.$store.commit("user/set_entInfo", res.data);
                this.$message.success("登录成功");
                let form = {};
                form = Object.assign(this.exInfo, { ent: res.data });
                this.$ipcRenderer.sendToExtension(form);
                this.$router.push("/first");
              } else {
                this.$message.error("登录异常，请稍后再试！");
              }
            })
            .catch(err => {
              console.log(err);
              // this.$message.error("登录异常，请稍后再试！");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "~@/common/css/keyboard";
.demo-ruleForm {
  width: 70%;
  display: inline-block;
}
.yzm {
  float: right;
}
</style>
