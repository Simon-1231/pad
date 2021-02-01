<template>
  <div id="extension">
    <!-- <div id="nav"> -->
    <!-- <h1>扩展首页</h1> -->
    <!--<router-link to="/">Home</router-link> |-->
    <!--<router-link to="/about">About</router-link>-->
    <!-- </div> -->
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    (function(doc, win) {
      const docEl = doc.documentElement;
      const resizeEvt =
        "orientationchange" in window ? "orientationchange" : "resize";
      const recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        // if (clientWidth >= 1920) {
        //   docEl.style.fontSize = '100px'
        // } else {
        docEl.style.fontSize = 10 * (clientWidth / 1920) + "px";
        // }
        console.log(docEl.style.fontSize);
      };

      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener("DOMContentLoaded", recalc, false);
    })(document, window);
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
