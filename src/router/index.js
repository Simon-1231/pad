import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import ReadCard from "@/views/ReadCard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/login/index")
  },
  {
    path: "/first",
    name: "first",
    component: () => import("@/views/first")
  },
  {
    path: "/entDetail",
    name: "entDetail",
    component: () => import("@/views/entDetail")
  },
  {
    path: "/positionList",
    name: "positionList",
    component: () => import("@/views/positionList")
  },
  {
    path: "/positionDetail",
    name: "positionDetail",
    component: () => import("@/views/positionDetail")
  },
  {
    path: "/infoManage",
    name: "infoManage",
    component: () => import("@/views/infoManage")
  },
  {
    path: "/positionManage",
    name: "positionManage",
    component: () => import("@/views/positionManage")
  },
  {
    path: "/postEditor",
    name: "postEditor",
    component: () => import("@/views/postEditor")
  },
  {
    path: "/entEditor",
    name: "entEditor",
    component: () => import("@/views/entEditor")
  },
  {
    path: "/resume",
    name: "resume",
    component: () => import("@/views/resume")
  },
  {
    path: "/checkResume",
    name: "resume",
    component: () => import("@/views/checkResume")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a s epara "e c" un;k (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/readcard",
    name: "ReadCard",
    component: ReadCard
  }
];

const router = new VueRouter({
  routes
});

export default router;
