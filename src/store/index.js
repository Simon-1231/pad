import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import createLogger from "vuex/dist/logger"; // 用于观察vuex状态日志

Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context("./modules", true, /\.js$/);

const debug = process.env.NODE_ENV !== "production";

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = new Vuex.Store({
  state: {
    naire: {},
    status: "create" // create or update
  },
  modules,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

export default store;
