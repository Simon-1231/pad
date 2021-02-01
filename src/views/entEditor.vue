<template>
  <div>
    <top-nav></top-nav>
    <div class="entEditor">
      <top-title title="企业简介修改" @goout="goout"></top-title>
      <div class="box">
        <div v-show="show" class="content1">{{ form.text }}</div>
        <div v-show="!show" class="content2">
          <el-form ref="form" :model="form">
            <el-form-item prop="text">
              <el-input
                type="textarea"
                v-model="form.text"
                ref="textarea"
                data-mode="cn"
                @focus="focus"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="button">
          <img
            v-show="show"
            @click="modify"
            src="~@/assets/imgs/btn_modify.png"
            alt=""
          />
          <img
            v-show="!show"
            @click="giveup"
            src="~@/assets/imgs/btn_giveup.png"
            alt=""
          />
          <img
            v-show="!show"
            @click="save"
            src="~@/assets/imgs/btn_save.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <vue-dusion-keyboard
      ref="keyboard"
      :float="true"
      bottom="20"
      observer
      class="my-keyboard"
    ></vue-dusion-keyboard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { updateIntroduction } from "@/api/ent";
import topNav from "@/components/TopNav";
import topTitle from "@/components/TopTitle";
export default {
  name: "entEditor",
  components: { topNav, topTitle },
  computed: {
    ...mapGetters(["entInfo"])
  },
  data() {
    return {
      show: true,
      form: {
        text: ""
      },
      text: ""
    };
  },
  created() {
    this.id = this.entInfo.id;
    this.form.text = this.entInfo.introduction;
  },
  methods: {
    focus() {
      this.$refs.textarea.blur();
      this.$refs.textarea.focus();
    },
    goout() {
      this.show = true;
    },
    modify() {
      this.show = false;
      // this.$refs.keyboard.sign_up_keyboard();
    },
    giveup() {
      this.show = true;
      this.form.text = this.entInfo.introduction;
    },
    save() {
      // this.$confirm("是否确认保存企业简介?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      const form = {
        id: this.id,
        introduction: this.form.text
      };
      updateIntroduction(form)
        .then(res => {
          if (res.code === 0) {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.entInfo_copy = this.entInfo;
            this.entInfo_copy.introduction = this.form.text;
            this.$store.commit("user/set_entInfo", this.entInfo_copy);
            this.$router.go(-1);
          } else {
            this.$message.error("保存失败，请联系管理员");
          }
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
          this.$message.error("保存失败，请联系管理员");
        })
        .finally(() => {
          this.show = true;
        });
      // })
      // .catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "已取消保存"
      //   });
      // });
    }
  }
};
</script>

<style lang="scss">
@import "~@/common/css/keyboard";
.entEditor {
  padding: 2rem;
  .box {
    padding: 1rem;
    .content1,
    .content2,
    .el-textarea__inner {
      width: 100%;
      height: 45rem;
      font-size: 2rem;
    }
    .button {
      text-align: right;
      img {
        margin: 1rem;
      }
    }
  }
}
</style>
