<template>
  <div class="home">
    <el-button
      style="margin-bottom: 30px"
      type="primary"
      icon="el-icon-s-custom"
      :loading="isLoading"
      @click="readIDCard"
      >读PAD身份证</el-button
    >
    <el-button
      style="margin-bottom: 30px"
      type="primary"
      icon="el-icon-s-custom"
      :loading="isTerminalLoading"
      @click="readTerminalIDCard"
      >读大终端身份证</el-button
    >
    <el-button style="margin-left: 20px" @click="returnBack">返回</el-button>
    <el-form label-width="80px" :model="form">
      <el-form-item label="头像">
        <img id="img" :src="form.headImg" style="width: 100px;height: 100px" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.sex"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.idCard"></el-input>
      </el-form-item>
      <el-form-item label="民族">
        <el-input v-model="form.nation"></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-input v-model="form.birthday"></el-input>
      </el-form-item>
      <el-form-item label="住址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const fs = require("fs");
import IDCardReader from "../IDCardReader";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      form: {
        headImg: "",
        name: "",
        sex: "",
        idCard: "",
        nation: "",
        birthday: "",
        address: ""
      },
      isLoading: false,
      isTerminalLoading: false
    };
  },
  /**
   * 页面创建
   */
  created() {
    try {
      // console.log("Dll:", Dll.User32.GetSystemMenu);
    } catch (e) {
      console.log(e);
    }
  },
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
    readIDCard() {
      try {
        this.isLoading = true;
        var params = IDCardReader.iReadMultiCard();
        var code = params.code;
        console.log("params", params, code);
        var result = params.result || "";
        if (code === 0) {
          this.$message.success("读取身份证成功");
          this.updateData(result);
        } else {
          var str = result.substring(0, 10);
          this.$message.error(str);
        }
        this.isLoading = false;
      } catch (e) {
        console.log("error", e);
        this.isLoading = false;
        this.$message.error(e.toString());
      }
    },
    /**
     * 读大终端身份证
     */
    readTerminalIDCard() {
      try {
        this.isTerminalLoading = true;
        var params = IDCardReader.terminalIReadMultiCard();
        var code = params.code;
        console.log("params", params, code);
        var result = params.result || "";
        if (code === 0) {
          this.$message.success("读取大终端身份证成功");
          this.updateData(result);
        } else {
          var str = result.substring(0, 10);
          this.$message.error(str);
        }
        this.isTerminalLoading = false;
      } catch (e) {
        console.log("error", e);
        this.isTerminalLoading = false;
        this.$message.error(e.toString());
      }
    },
    /**
     * 返回
     *
     * */
    returnBack() {
      this.$router.back(-1);
    },
    /**
     * 更新数据
     */
    updateData(result) {
      var resultList = result.split("|");
      if (resultList && resultList.length > 0) {
        this.form.name = resultList[0] || "";
        this.form.sex = resultList[1] || "";
        this.form.nation = resultList[2] || "";
        this.form.birthday = resultList[3] || "";
        this.form.address = resultList[4] || "";
        this.form.idCard = resultList[5] || "";
        fs.readFile("D:\\zp.bmp", (err, data) => {
          var file = new File([data], "AnyName.jpg", { type: "image/jpg" });
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function() {
            var newUrl = this.result;
            document.getElementById("img").src = newUrl;
          };
        });
      }
    }
  }
};
</script>
<style scoped>
.home {
  width: 26rem;
}
</style>
