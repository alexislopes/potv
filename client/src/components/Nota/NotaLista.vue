<template>
  <section class="items-container">
    <transition mode="out-in">
      <div v-if="notas && notas.length" class="items" key="items">
        <div class="item" v-for="nota in notas" :key="nota._id">
          <router-link :to="{ name: 'nota', params: {id: nota._id} }">
            <p class="preco">{{nota.getTotal() | numeroPreco}}</p>
            <h2 class="titulo">{{nota.title}}</h2>
            <p>{{nota.items.length}} {{singlural(nota.items.length)}}</p>
            <p>{{nota.local }}</p>
            <p>{{nota.timestamp | formatData }}</p>
          </router-link>
        </div>
      </div>
      <div v-else-if="notas && notas.length === 0" key="sem-resultados">
        <p class="sem-resultados">Busca sem resultados!</p>
      </div>
      <PaginaCarregando key="carregando" v-else />
    </transition>
  </section>
</template>

<script>
import { notaServices } from "../../services/NotaServices";
import { mapState } from "vuex";
import Nota from "../../models/Nota";

export default {
  data() {
    return {
      notas: null
    };
  },
  methods: {
    singlural(len) {
      return len === 1 ? "Item" : "Itens";
    }
  },
  async created() {
    this.notas = await notaServices.find();
  }
};
</script>

<style scoped>
.item {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

p {
  padding: 5px 0;
}

.item:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.item img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.titulo {
  margin-bottom: 10px;
}

.preco {
  color: #e80;
  font-weight: bold;
}

.sem-resultados {
  text-align: center;
}

.items-container {
  max-width: 1000px;
  margin: 0 auto;
}

.items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

@media screen and (max-width: 500px) {
  .items {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin: 10px;
  }
}
</style>