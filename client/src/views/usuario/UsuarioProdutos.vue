<template>
  <section>
    <h2>Lista de produtos</h2>
    <produto-adicionar />
    <h2>Seus Produtos</h2>
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" :key="produto._id">
        <produto-item :produto="produto">
          <p>{{produto.name}}</p>
          <button class="deletar" @click.prevent="deletar(produto._id)">Deletar</button>
        </produto-item>
      </li>
    </transition-group>
  </section>
</template>

<script>
import ProdutoAdicionar from "@/components/ProdutoAdicionar.vue";
import ProdutoItem from "@/components/ProdutoItem.vue";
import { mapState, mapActions } from "vuex";
import { itemServices } from "@/services/ItemServices";

export default {
  name: "UsuarioProdutos",
  computed: {
    ...mapState(["login", "usuario", "usuario_produtos"])
  },
  methods: {
    ...mapActions(["getUsuarioProdutos"]),
    deletar(id) {
      const confirmar = window.confirm("Deseja remover este produto?");
      if (confirmar) {
        itemServices
          .deleteItem(id)
          .then(() => {
            this.getUsuarioProdutos();
          })
          .catch(error => {
            console.log(error.response);
          });
      }
    }
  },
  watch: {
    login() {
      this.getUsuarioProdutos();
    }
  },
  created() {
    if (this.login) {
      this.getUsuarioProdutos();
    }
  },
  components: {
    ProdutoAdicionar,
    ProdutoItem
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-avtive,
.list-leave-active {
  transition: all 0.3s;
}

.deletar {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url("../../assets/remove.svg") no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
</style>