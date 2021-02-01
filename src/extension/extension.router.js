import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
// import About from "../views/About.vue";
// import Login fron "@/views/extension/login.vue"
import ReadCard from "@/views/ReadCard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("./views/login")
  },
  {
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("./views/home")
    // import(/* webpackChunkName: "about" */ "../views/Home.vue")
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
