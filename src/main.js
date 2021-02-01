import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Cookies from "js-cookie";
import electron from "electron";
import common from "./common/IpcCommon";
import ipcService from "@/ipc/ipcService";
import VueDusionKeyboard from "vue-dusion-keyboard";

Vue.config.productionTip = false;
Vue.prototype.$electron = electron;
Vue.prototype.$common = common;
Vue.use(Element, {
  size: Cookies.get("size") || "medium" // set element-ui default size
});
Vue.use(ipcService);
Vue.use(VueDusionKeyboard);

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
