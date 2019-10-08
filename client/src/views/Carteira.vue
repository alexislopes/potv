<template>
  <div class="form">
    <div v-if="carteira.sources" class="container">
      <div class="inputs">
        <div v-for="(source, index) in carteira.sources">
          <label :for="source.type">{{source.type}}</label>
          <input
            :id="source.type"
            @keyup="updateSources($event)"
            :value="source.balance"
            type="number"
          />
        </div>
      </div>
      <input type="submit" @click.prevent="updateCarteira" class="btn" value="Atualizar Carteira" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["carteira"])
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["updateCarteira", "updateSource"]),
    async updateSources(event) {
      let id = event.target.id;
      let balance = Number(event.target.value);
      await this.updateSource({ type: id, balance: balance });
    }
  }
};
</script>

<style scoped>
.container {
  width: 900px;
  margin: 0 auto;
}

label {
  font-weight: bold;
}

.inputs {
  margin-top: 120px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}

.form {
  width: 100%;
}

body {
  margin: 0 auto;
}
</style>