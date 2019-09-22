<template>
  <section>
    <h1>Dashboard</h1>
    <!-- <h1>Compre ou Venda</h1>
    <produtos-buscar />
    <produtos-lista />-->
  </section>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import ProdutosBuscar from "@/components/ProdutosBuscar.vue";
import ProdutosLista from "@/components/ProdutosLista.vue";

export default {
  components: {
    ProdutosBuscar,
    ProdutosLista
  }
};
</script>

<style scoped>
h1 {
  margin-top: 40px;
  color: #d4af37;
  font-size: 2rem;
  text-align: center;
}
</style>
