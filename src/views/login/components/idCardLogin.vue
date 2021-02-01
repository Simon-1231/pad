<template>
  <div class="main">
    <img src="~@/assets/imgs/read_card.png" alt="" />
    <p>请将单位经办人身份证放入感应器上方</p>
    <OBJECT
      classid="clsid:69E85E05-6623-48A1-A3CA-781B3EA212C7"
      width="0"
      height="0"
      align="center"
      id="TSCardOcx"
      ref="TSCardOcx"
      HSPACE="0"
      VSPACE="0"
    >
    </OBJECT>
  </div>
</template>

<script>
import IDCardReader from "@/IDCardReader";
import { cardLogin } from "@/api/user";
export default {
  name: "idCardLogin",
  props: {
    exInfo: {
      type: Object,
      default: () => ({})
    },
    activeName: {
      type: String,
      default: ""
    }
  },
  watch: {
    activeName(val) {
      console.log("val", val);
      if (val !== "second") {
        this.clearInter();
      } else {
        this.startInter();
      }
    }
  },
  data() {
    return {
      // isLoading: false
    };
  },
  created() {},
  beforeDestroy() {
    this.clearInter();
    console.log("销毁");
  },
  methods: {
    startInter() {
      this.timer = setInterval(() => {
        this.readIDCard();
      }, 1500);
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
      var result = params.result || "检测身份证错误，请联系管理员";
      if (code === 0) {
        this.loading = this.$loading({
          lock: true,
          text: "身份证检测中。。。",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$message.success("读取身份证成功");
        this.clearInter(); // 扫描成功后停止定时器
        // this.updateData(result);
        this.sfzh = result.split("|")[5];
        cardLogin({ sn: this.exInfo.sn, sfzh: this.sfzh })
          .then(res => {
            // res.data = null;
            if (res.code === 0 && res.data) {
              this.$store.commit("user/set_entInfo", res.data);
              this.$message.success("登录成功！");
              let form = {};
              form = Object.assign(this.exInfo, { ent: res.data });
              form.type = "login";
              this.$ipcRenderer.sendToExtension(form);
              setTimeout(() => {
                this.loading.close();
                this.$router.push({ path: "/first" });
              }, 2000);
            } else {
              setTimeout(() => {
                // this.startInter(); // 登录失败后重新启动定时器扫描身份证
                this.$emit("relogin"); // 登录失败后重新选择身份证扫描
                this.loading.close();
              }, 2000);
              this.$message.error("登录异常，请稍后再试！");
            }
          })
          .catch(err => {
            console.log(err);
            setTimeout(() => {
              this.loading.close();
              this.$emit("relogin"); // 登录失败后重新选择身份证扫描
              // this.$message.error(err.msg);
            }, 2000);
          });
      } else {
        if (this.loading) {
          setTimeout(() => {
            this.loading.close();
            this.$emit("relogin"); // 登录失败后重新选择身份证扫描
          }, 2000);
        }
      }
    },
    iReadSFZ() {
      const Tocx = this.$refs.TSCardOcx;

      this.result = Tocx.iReadSFZ();
      if (this.result == 0) {
        this.text = "该卡为身份证！" + Tocx.pOutInfo;
      } else if (this.result == 1) {
        this.text = "该卡为外国人居住证！" + Tocx.pOutInfo;
      } else if (this.result == 2) {
        this.text = "该卡为港澳台居住证！" + Tocx.pOutInfo;
      } else {
        this.text = "读证件失败！返回码(" + this.result + ")!" + Tocx.pOutInfo;
      }
    }
  }
};
</script>

<style lang="scss">
.main {
  position: relative;
  height: 22rem;
  img {
    height: 100%;
  }
  p {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>
