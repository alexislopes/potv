import Vue from "vue";
import App from "./App.vue";
import SuiVue from "semantic-ui-vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Datetime from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";

import PaginaCarregando from "./components/PaginaCarregando.vue";
import ErroNotificacao from "./components/ErroNotificacao.vue";
import Aviso from "./components/Aviso.vue";

Vue.component("PaginaCarregando", PaginaCarregando);
Vue.component("ErroNotificacao", ErroNotificacao);
Vue.component("Aviso", Aviso);

Vue.filter("numeroPreco", (valor: any) => {
  valor = Number(valor);
  if (!isNaN(valor)) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  } else {
    return "";
  }
});

Vue.filter("formatData", (timestamp: number) => {
  let months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez"
  ];
  let weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  let data = new Date(timestamp);
  return `${weekdays[data.getDay()]} • ${data.getDate()} ${
    months[data.getMonth()]
  } ${data.getFullYear()}`;
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

Vue.use(SuiVue);
Vue.use(Datetime);
