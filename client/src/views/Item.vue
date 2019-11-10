<template>
  <div class="item container">
    <div class="selectors">
      <div class="tab items">
        <a @click="displayItems()">Items</a>
      </div>
      <div class="tab notas">
        <a @click="displayNotas()">Notas</a>
      </div>
    </div>

    <div class="contents">
      <ItemAdicionar v-if="toggle" />
      <ItemsLista v-if="toggle" />
      <nota-lista v-else />
    </div>
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
  grid-gap: 20px;
  position: fixed;
  z-index: 10;
  background-color: #fff;
  margin: 20px;
  margin-top: -60px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  width: 97%;
  border-radius: 4px;
  margin-bottom: 60px;
}

.tab {
  text-align: center;
  padding: 20px;
}

.items-selector {
  margin-left: 60px;
  height: 100%;
}

.container {
  margin-top: 180px;
  margin-bottom: 20px;
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

/* .items-selector a:after {
  content: "";
  display: block;
  background-color: yellow;
} */
</style>




