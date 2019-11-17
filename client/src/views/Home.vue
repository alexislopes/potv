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

      <tile-dashboard
        v-for="categorie in totalCategories"
        :key="categorie.title"
        :title="categorie.title"
        :total="categorie.total"
      />
    </div>
  </section>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import ProdutosBuscar from "@/components/ProdutosBuscar.vue";
import ProdutosLista from "@/components/ProdutosLista.vue";
import TileDashboard from "@/components/TileDashboard.vue";
import { itemServices } from "../services/ItemServices";

export default {
  async created() {
    await itemServices.fetchItems().then(res => {
      this.items = res.data.items;
    });
    await this.setCategories();
    await this.getTotalByCategorie();
  },
  data() {
    return {
      items: null,
      categories: [],
      totalCategories: []
    };
  },
  methods: {
    async setCategories() {
      const unique = (value, index, self) => {
        return self.indexOf(value) === index;
      };

      let categories = [];

      this.items.forEach(item => {
        // console.log(item.tags);
        item.tags.forEach(tag => {
          categories.push(tag);
        });
      });

      categories = categories.map(string => {
        return string.toLowerCase();
      });
      const uniqueCategories = categories.filter(unique);
      // await uniqueCategories.forEach(async categorie => {
      //   let total = await this.getTotalByCategorie(categorie);
      //   console.log("total antes: ", total);
      //   console.log("antes: ", { title: categorie, total: total });
      //   await this.categories.push({ title: categorie, total: total });
      // });
      this.categories = uniqueCategories;
      // console.log("categories: ", this.categories);
    },
    getTotalByCategorie() {
      let total = 0;
      this.categories.forEach(async categorie => {
        total = 0;
        console.log(categorie);
        this.items.forEach(async item => {
          item.tags = item.tags.map(string => {
            return string.toLowerCase();
          });
          console.log(item.tags);
          if (item.tags.includes(categorie)) {
            item.priceData.forEach(priceD => {
              total += Number(priceD.price);
            });
          }
          // console.log("total na função: ", total);
          // return total;
        });
        await this.totalCategories.push({ title: categorie, total: total });
      });
      // console.log("totalCats: ", this.totalCategories);
    }
  },
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
