<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input id="nome" name="nome" type="text" v-model="produto.name" />

    <label for="preco">Preço</label>
    <input id="preco" name="preco" type="number" v-model="produto.preco" />

    <label for="fotos">fotos</label>
    <input id="fotos" name="fotos" type="file" ref="fotos" />

    <label for="descricao">Descrição</label>
    <textarea name="descricao" id="descricao"></textarea>

    <input class="btn" type="button" value="Adicionar Produto" @click.prevent="adicionarProduto" />
  </form>
</template>

<script>
import { itemServices } from "../services/ItemServices";
export default {
  name: "ProdutosAdicionar",
  data() {
    return {
      produto: {
        name: "",
        preco: "",
        descricao: "",
        fotos: null,
        priceData: ""
      }
    };
  },
  methods: {
    formatarProduto() {
      this.produto.usuario_id = this.$store.state.usuario._id;
      this.produto.priceData = [
        {
          price: "1.99",
          brand: "Ana Maria",
          timestamp: 1565563330105,
          local: "Shibata"
        }
      ];
    },
    async adicionarProduto() {
      await this.formatarProduto();
      itemServices.createItem(this.produto).then(() => {
        this.$store.dispatch("getUsuarioProdutos");
      });
    }
  }
};
</script>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>