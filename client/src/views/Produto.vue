<template>
  <section>
    <div v-if="item" class="produto">
      <ul class="fotos" v-if="item.fotos">
        <li v-for="(foto, index) in  item.fotos" :key="key">
          <img :src="foto.src" :alt="foto.titulo" />
        </li>
      </ul>
      <div class="info">
        <h1>{{item.name}}</h1>
        <div class="tags">
          <p class="tag" v-for="tag in item.tags">{{tag}}</p>
        </div>
        <button v-if="item.vendido === 'false'" class="btn">Comprar</button>

        <div class="head">
          <p class="preco">preço</p>
          <p class="local">local</p>
          <p class="marca">marca</p>
          <p class="timestamp">data</p>
        </div>

        <div class="prices">
          <ItemPriceLista
            v-for="priceData in item.priceData"
            :key="priceData._id"
            :priceData="priceData"
          />
        </div>
        <!-- <button v-else class="btn" disabled>Produto Vendido</button> -->
      </div>
    </div>

    <PaginaCarregando v-else />
  </section>
</template>

<script>
import { itemServices } from "../services/ItemServices";
import ItemPriceLista from "@/components/ItemPriceLista.vue";

export default {
  name: "Produto",
  props: ["id"],
  components: {
    ItemPriceLista
  },
  data() {
    return {
      item: null
    };
  },
  methods: {
    async fetchProduto() {
      const item = await itemServices.fetchItem(this.id);
      this.item = item;
    }
  },
  created() {
    this.fetchProduto();
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
  margin-top: 80px;
}

.tags {
  display: flex;
  margin-top: 20px;
  margin-bottom: 60px;
}

.tag {
  margin-right: 20px;
}

/* .prices {
  max-height: 400px;
  max-width: auto;
  overflow: hidden;
  z-index: -1;
} */

.head {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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

.preco {
  grid-column: 1;
}

.local {
  grid-column: 2;
}

.marca {
  grid-column: 3;
}

.timestamp {
  grid-column: 4;
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