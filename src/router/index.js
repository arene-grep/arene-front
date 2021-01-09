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
    name: "addProduct",
    component: () => import("../views/Products/ProductAdd.vue")
  },
  {
    path: "/products",
    name: "getProducts",
    component: () => import("../views/Products/Products.vue")
  },
  {
    path: "/products/:id",
    name: "getProduct",
    component: () => import("../views/Products/ProductUpdate.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue")
  },
  {
    path: "/events",
    name: "getEvents",
    component: () => import("../views/Events/Events.vue")
  },
  {
    path: "/events/:id",
    name: "getEvent",
    component: () => import("../views/Events/EventUpdate.vue")
  },
  {
    path: "/addEvent/",
    name: "addEvent",
    component: () => import("../views/Events/EventAdd")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
