import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/item",
      name: "Item",
      component: () => import("./views/Item.vue")
    },
    {
      path: "/items",
      name: "Items",
      component: () => import("./views/Items.vue")
    },
    {
      path: "/tag",
      name: "Tag",
      component: () => import("./views/Tag.vue") 
    },
    {
      path: "/tags",
      name: "Tags",
      component: () => import("./views/Tags.vue")
    }
  ]
});
