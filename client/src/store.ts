import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import { userServices } from "@/services/UserServices";
import { itemServices } from "@/services/ItemServices";
import { authServices } from "./services/AuthServices";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "OPTV",
  storage: localStorage
});

export default new Vuex.Store({
  strict: true,
  plugins: [vuexPersist.plugin],
  state: {
    login: false,
    item: {
      __v: 0,
      _id: "",
      name: "",
      tags: "",
      priceData: [
        {
          kgData: {
            kg: "",
            kgPrice: ""
          },
          price: "",
          brand: "",
          timestamp: "",
          local: ""
        }
      ]
    },
    usuario: {
      __v: 0,
      _id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: ""
    },
    items: null,
    usuario_produtos: null
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    },
    UPDATE_ITEM(state, payload) {
      state.item = Object.assign(state.item, payload);
    },
    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload;
    },
    UPDATE_ITEMS(state, payload) {
      state.items = payload;
    }
    // ADD_USUARIO_PRODUTOS(state, payload) {
    //   state.usuario_produtos.unshift(payload);
    // }
  },
  actions: {
    getUsuarioProdutos(context) {
      itemServices.fetchItems().then(res => {
        context.commit("UPDATE_USUARIO_PRODUTOS", res.data.items);
      });
    },
    logarUsuario(context, payload) {
      return authServices.login({
        username: payload.username,
        password: payload.password
      });
    },
    getUsuario(context, payload) {
      return userServices.fetchUserByEmail(payload).then((res: any) => {
        context.commit("UPDATE_USUARIO", res);
        context.commit("UPDATE_LOGIN", true);
      });
    },
    createUsuario(context, payload) {
      return userServices.createUser(payload);
    },
    createItem(context, payload) {
      return itemServices.createItem(payload);
    },
    getItems(context, payload) {
      return itemServices.fetchItems().then((res: any) => {
        context.commit("UPDATE_ITEMS", res.data.items);
      });
    },
    deslogarUsuario(context) {
      context.commit("UPDATE_USUARIO", {
        __v: 0,
        _id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: ""
      });
      context.commit("UPDATE_LOGIN", false);
    }
  }
});
