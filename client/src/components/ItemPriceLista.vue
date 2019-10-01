<template>
  <div class="price-data" v-if="priceData">
    <!-- <router-link class="produto-img" :to="{name: 'produto', params: {id : priceData._id}}">
      <img v-if="priceData.fotos" :src="priceData.fotos[0].src" :alt="priceData.fotos[0].titulo" />
      <p>Ver Produto</p>
    </router-link>-->

    <div class="info">
      <p class="preco">{{priceData.price | numeroPreco}}</p>
      <p class="local">{{priceData.local}}</p>
      <p class="marca">{{priceData.brand}}</p>
      <p class="timestamp">{{priceData.timestamp | formatData}}</p>
      <!-- <h2 class="titulo">{{produto.name}}</h2> -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProdutoItem",
  props: ["priceData"]
};
</script>

<style scoped>
.price-data {
  display: block;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 20px;
  position: relative;
}

.info,
.head {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  width: 900px;
  align-self: end;
  text-align: center;
}

.info {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 5px 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.info:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
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

.produto-img {
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
}

@media screen and (max-width: 500px) {
  .produto {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
}
</style>