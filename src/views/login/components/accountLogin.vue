<template>
  <div class="main">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="10rem"
      class="demo-ruleForm"
    >
      <el-form-item label="请输入账号" prop="username">
        <el-input
          type="text"
          v-model.trim="ruleForm.username"
          data-mode="en_let"
        ></el-input>
      </el-form-item>
      <el-form-item label="请输入密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          data-mode="en_let"
        ></el-input>
      </el-form-item>
      <div class="sub">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </el-form>
    <vue-dusion-keyboard float class="my-keyboard"></vue-dusion-keyboard>
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  props: {
    exInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      ruleForm: {
        username: "",
        password: ""
      }
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
    /**
     * 登录
     */
    submitForm(formName) {
      // console.log("this.$refs", this.$refs, this.$common.CC_MAIN_MSG);
      this.$refs[formName].validate(valid => {
        if (valid) {
          const form = {
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            sn: this.exInfo.sn
          };
          login(form)
            .then(res => {
              console.log(res);
              if (res.code === 0 && res.data) {
                console.log(`登录成功！！！！`, res);
                this.$store.commit("user/set_entInfo", res.data);
                this.$message.success("登录成功！");
                let form = {};
                form = Object.assign(this.exInfo, { ent: res.data });
                form.type = "login";
                this.$ipcRenderer.sendToExtension(form);
                this.$router.push({ path: "/first" });
              } else {
                this.$message.error("登录异常，请稍后再试！");
              }

              // this._getInfo(); // 登录成功后获取当前用户信息，设置username于sessionStorage中
            })
            .catch(err => {
              console.log(err);
              // this.$message.error("登录异常，请稍后再试！");
            });
          // this.$ipcRenderer.sendToExtension(params);

          // this.$router.push("/readcard");
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
  width: 90%;
}
.el-input--medium .el-input__inner {
  height: 3.5rem;
  line-height: 3.5rem;
}
.el-input--medium {
  font-size: 1.5rem;
}
.el-button--medium {
  font-size: 1.6rem;
}
.el-form-item__error {
  font-size: 1.2rem;
}
.el-form-item {
  margin-bottom: 2rem;
}
</style>
