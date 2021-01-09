import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/addProduct",
    name: "AddProduct",
    component: () => import("../views/ProductAdd.vue")
  },
  {
    path: "/products",
    name: "GetProducts",
    component: () => import("../views/Products.vue")
  },
  {
    path: "/products/:id",
    name: "getProductID",
    component: () => import("../views/ProductUpdate.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
