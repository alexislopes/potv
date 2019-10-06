import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Produto from "./views/Produto.vue";
import Nota from "./views/Nota.vue";

Vue.use(Router);

const router = new Router({
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
    },
    {
      path: "/itemDetails",
      name: "Item Details",
      component: () => import("./views/ItemDetails.vue")
    },
    {
      path: "/produto/:id",
      name: "produto",
      component: Produto,
      props: true
    },
    {
      path: "/nota/:id",
      name: "nota",
      component: Nota,
      props: true
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/usuario",
      component: () => import("./views/usuario/Usuario.vue"),
      meta: {
        login: true
      },
      children: [
        {
          path: "",
          name: "usuario",
          component: () => import("./views/usuario/UsuarioProdutos.vue")
        },
        {
          path: "compras",
          name: "compras",
          component: () => import("./views/usuario/UsuarioCompras.vue")
        },
        {
          path: "vendas",
          name: "vendas",
          component: () => import("./views/usuario/UsuarioVendas.vue")
        },
        {
          path: "editar",
          name: "usuario-editar",
          component: () => import("./views/usuario/UsuarioEditar.vue")
        }
      ]
    }
  ],
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.login)) {
//     if (!window.localStorage.token) {
//       next("/login");
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
