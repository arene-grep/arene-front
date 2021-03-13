import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from '../store/index.js'

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/home' },
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
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Account/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Account/Register.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account/Account.vue'),
    meta: {
      requiresAuth: true
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    if (store.getters.isLoggedIn && to.path === '/register') {
      next('/account')
      return
    }
    if (store.getters.isLoggedIn && to.path === '/login') {
      next('/account')
      return
    }
    next()
  }
})

export default router;
