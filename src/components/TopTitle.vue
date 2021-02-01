<template>
  <div class="toptitle">
    <img class="img" src="~@/assets/imgs/return.png" alt="" @click="goback()" />
    <p class="title">{{ title }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "toptitle",
  props: {
    title: {
      type: String,
      default: ""
    },
    resume: {
      type: Number,
      default: 1
    }
  },
  // watch: {
  //   resume(val) {}
  // },
  methods: {
    goback() {
      this.$emit("goout");
      if (this.resume) {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="scss">
.toptitle {
  text-align: left;
  .img {
    width: 9rem;
    vertical-align: middle;
  }
  .title {
    font-size: 3rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(48, 48, 48, 1);
    display: inline-block;
    margin: 0 0 0 1rem;
    vertical-align: middle;
  }
}
</style>
