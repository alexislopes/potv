<template>
  <div class="price-data" v-if="item && quantity && fixedPriceData">
    <div class="info">
      <p class="quantidade">{{quantity}}</p>
      <p class="item">{{item.name}}</p>
      <p class="fracao">{{fixedPriceData.kgData.kg}}</p>
      <p class="valfr">{{fixedPriceData.kgData.kgPrice}}</p>
      <p class="preco">{{fixedPriceData.price | numeroPreco}}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotaItem",
  props: ["item", "quantity", "fixedPriceData"]
};
</script>

<style scoped>
.price-data {
  display: block;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 20px;
  position: relative;
}

.info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  width: 900px;
  align-self: end;
  text-align: center;

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