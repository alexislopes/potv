<template>
  <form>
    <input name="busca" id="busca" v-model="busca" type="text" placeholder="Buscar..." />
    <input type="submit" id="lupa" value="Buscar" @click.prevent="buscarProdutos()" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      busca: null
    };
  },
  computed: {
    url() {
      return this.$route.query;
    }
  },
  methods: {
    buscarProdutos() {}
  }
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
  padding: 0 10px;
}

#busca {
  width: 100%;
  padding: 20px;
  border: none;
}

#busca:focus,
#busca:hover {
  transform: scale(1.1);
}

#lupa {
  width: 62px;
  height: 62px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  text-indent: -150px;
}
</style>