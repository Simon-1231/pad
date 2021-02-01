<template>
  <div class="home">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    </el-tabs>
    <div class="form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="sub">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      ruleForm: {
        username: "admin",
        password: "123456"
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
    /**
     * 登录
     */
    submitForm(formName) {
      var that = this;
      console.log("this.$refs", this.$refs, this.$common.CC_MAIN_MSG);
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = that.ruleForm;
          this.$ipcRenderer.sendToExtension(params);
          that.$message.success("登录成功");
          this.$router.push("/readcard");
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
.home {
  position: fixed;
  // left: 0;
  right: 0;
  top: 0;
  // bottom: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  .form {
    width: 50%;
    max-width: 500px;
    background: #fff;
    position: relative;
    top: 50%;
    height: 250px;
    margin: -125px auto 0;
  }
  .demo-ruleForm {
    width: 90%;
    padding-top: 50px;
  }
}
</style>
