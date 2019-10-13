<template>
  <div class="carteira">
    <p v-if="localcarteira.sources" class="valor">{{localcarteira.getAmount() | numeroPreco}}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Carteira from "../models/Carteria";
export default {
  async created() {
    await this.getCarteira();
    await this.setLocalCarteira(this.carteira);
  },
  computed: {
    ...mapState(["carteira"])
  },
  data() {
    return {
      localcarteira: ""
    };
  },
  methods: {
    ...mapActions(["getCarteira"]),
    setLocalCarteira(carteira) {
      if (carteira) {
        this.localcarteira = new Carteira(carteira);
      }
    }
  }
};
</script>

<style scoped>
.carteira {
  width: 100%;
  border: solid 1px rgb(90, 202, 90);
  color: rgb(90, 202, 90);
  border-radius: 4px;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
  box-shadow: rgba(30, 60, 90, 0.2);
  text-align: center;
}

.carteira:hover {
  transform: scale(1.1);
}
</style>