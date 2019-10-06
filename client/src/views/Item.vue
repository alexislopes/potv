<template>
  <div class="item container">
    <!-- <add-fab /> -->
    <div class="selectors">
      <div class="tab items">
        <a @click="displayItems()">Items</a>
      </div>
      <div class="tab notas">
        <a @click="displayNotas()">Notas</a>
      </div>
    </div>
    <div v-if="toggle">
      <ItemAdicionar />
      <ItemsLista />
    </div>
    <div v-else>
      <nota-lista />
    </div>
    <!-- <FormItem /> -->
    <!-- <button class="btn-add ui circular right floated linkedin icon button">Adicionar</button> -->
    <!-- <FormItem /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ItemAdicionar from "@/components/ItemAdicionar.vue";
import ItemsLista from "@/components/ItemsLista.vue";
import NotaLista from "@/components/Nota/NotaLista.vue";
import AddFab from "@/components/AddFab.vue";
import NotaCard from "@/components/Nota/NotaCard.vue";
import { notaServices } from "../services/NotaServices";

export default Vue.extend({
  computed: {},
  data() {
    return {
      toggle: true
    };
  },
  methods: {
    displayItems() {
      this.toggle = true;
    },
    displayNotas() {
      this.toggle = false;
    }
  },
  components: {
    ItemAdicionar,
    ItemsLista,
    NotaLista,
    AddFab,
    NotaCard
  }
});
</script>

<style scoped>
.selectors {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: -100px;
  grid-gap: 20px;
  position: fixed;
  z-index: 10;
  background-color: aliceblue;
  width: 100%;
}

.item {
  margin-top: 100px;
}

.tab {
  widows: 100%;
  text-align: center;
  padding: 20px;
}

.items-selector {
  margin-left: 60px;
  height: 100%;
}

a {
  cursor: pointer;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 14px;
  line-height: 20px;
  padding: 10px 0;
}

.items-selector a:after {
  content: "";
  display: block;
  background-color: yellow;
}
</style>




