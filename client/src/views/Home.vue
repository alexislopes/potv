<template>
  <section>
    <h1>Dashboard</h1>
    <!-- <h1>Compre ou Venda</h1>
    <produtos-buscar />
    <produtos-lista />-->
    <div class="tiles">
      <tile-dashboard title="HOJE" endpoint="/getTodayExpense" />

      <tile-dashboard :title="new Date().getMonth() | mes" endpoint="/currentMonthExpense" />
      <tile-dashboard :title="new Date().getFullYear()" endpoint="/getCurrentYearExpense" />
    </div>
  </section>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import ProdutosBuscar from "@/components/ProdutosBuscar.vue";
import ProdutosLista from "@/components/ProdutosLista.vue";
import TileDashboard from "@/components/TileDashboard.vue";

export default {
  components: {
    ProdutosBuscar,
    ProdutosLista,
    TileDashboard
  }
};
</script>

<style scoped>
section {
  margin-top: 120px;
}

h1 {
  margin-top: 40px;
  color: #d4af37;
  font-size: 2rem;
  text-align: center;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}
</style>
