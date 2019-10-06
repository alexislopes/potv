<template>
  <section>
    <div v-if="nota" class="produto">
      <!-- <ul class="fotos" v-if="item.fotos">
        <li v-for="(foto, index) in  item.fotos" :key="key">
          <img :src="foto.src" :alt="foto.titulo" />
        </li>
      </ul>-->
      <div class="info">
        <h1>{{nota.title}}</h1>
        <p class="total">{{nota.getTotal() | numeroPreco}}</p>
        <p class="data">{{nota.timestamp | formatData}} em {{nota.local}}</p>

        <div class="head">
          <p class="quantidade">quantidade</p>
          <p class="item">Item</p>
          <p class="fracao">fração</p>
          <p class="valfr">valor/fração</p>
          <p class="preco">Preço</p>
        </div>
        <NotaItem
          v-if="nota"
          v-for="item in nota.items"
          :key="item._id"
          :item="item.item"
          :quantity="item.quantity"
          :fixedPriceData="item.fixedPriceData"
        />
        <!-- <button v-else class="btn" disabled>Produto Vendido</button> -->
      </div>
    </div>

    <PaginaCarregando v-else />
  </section>
</template>

<script>
import { notaServices } from "../services/NotaServices";
import NotaItem from "../components/Nota/NotaItem";

export default {
  name: "Nota",
  props: ["id"],
  components: { NotaItem },
  data() {
    return {
      nota: null
    };
  },
  methods: {
    async fetchNota() {
      const nota = await notaServices.findById(this.id);
      console.log("found: ", nota);
      this.nota = nota;
    }
  },
  created() {
    this.fetchNota();
  }
};
</script>

<style scoped>
.produto {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

/* .info h1 {
  margin-bottom: 60px;
} */

.total {
  color: #e80;
  font-weight: bold;
  margin: 10px 0;
}

.data {
  margin-bottom: 60px;
  font-weight: bold;
}

.head {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  width: 900px;
  align-self: end;
  text-align: center;
}

.head {
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 20px;
}

.quantidade {
  grid-column: 1;
}

.item {
  grid-column: 2;
}

.fracao {
  grid-column: 3;
}

.valfr {
  grid-column: 4;
}

.preco {
  grid-column: 5;
}

/* .preco {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
} */

.descricao {
  font-size: 1.2rem;
}

.btn {
  margin-top: 60px;
  width: 200px;
}

@media screen and (max-width: 500) {
  .produto {
    grid-template-columns: 1fr;
  }

  .fotos {
    grid-row: 2;
  }

  .info {
    position: initial;
  }
}
</style>