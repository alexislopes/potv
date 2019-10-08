import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import { userServices } from "@/services/UserServices";
import { itemServices } from "@/services/ItemServices";
import { authServices } from "./services/AuthServices";
import { carteiraServices } from "./services/CarteiraServices";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "OPTV",
  storage: localStorage
});

export default new Vuex.Store({
  strict: true,
  plugins: [vuexPersist.plugin],
  state: {
    aviso: {
      mensagem: "",
      tipo: ""
    },
    carteira: { _id: null, sources: [] },
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
    },
    UPDATE_CARTEIRA(state, payload) {
      state.carteira = payload;
    },
    UPDATE_SOURCE(state, payload) {
      let tempCarteira = state.carteira;
      if (state.carteira.sources != null) {
        tempCarteira.sources.forEach((source: any) => {
          if (source.type === payload.type) {
            source.balance = payload.balance;
          }
        });
      }

      state.carteira = tempCarteira;
    },
    UPDATE_AVISO(state, payload) {
      state.aviso = payload;
    }
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
    async getCarteira(context, payload) {
      return await carteiraServices.find().then((res: any) => {
        if (res) {
          context.commit("UPDATE_CARTEIRA", res);
        }
      });
    },
    updateCarteira(context, payload) {
      return carteiraServices
        .update(this.state.carteira._id, this.state.carteira)
        .then((res: any) => {
          context.dispatch("getCarteira");
        });
    },
    updateSource(context, payload) {
      context.commit("UPDATE_SOURCE", payload);
    },
    updateAviso(context, payload) {
      console.log("payload em store: ", payload);
      context.commit("UPDATE_AVISO", payload);
      setTimeout(() => {
        context.commit("UPDATE_AVISO", { mensagem: "", tipo: "" });
      }, 5000);
    },
    async createCarteira(context, payload) {
      const carteira = await carteiraServices.create({
        sources: [
          { type: "Nubank", balance: 0 },
          { type: "Itaú", balance: 0 },
          { type: "Dinheiro", balance: 0 }
        ]
      });
      context.commit("UPDATE_CARTEIRA", carteira);
      return carteira
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
