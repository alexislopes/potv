import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "potv",
  storage: localStorage
});

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    selectedItemId: null
  },
  mutations: {
    setSelectedItemId(state, selectedItemId){
      state.selectedItemId = selectedItemId;
    }
  },
  actions: {}
});
