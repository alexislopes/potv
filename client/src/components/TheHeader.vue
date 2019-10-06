<template>
  <header>
    <nav>
      <router-link to="/" class="logo">
        <img src="../assets/potato-svgrepo-com.svg" alt="OPTV" />
      </router-link>
      <div class="menu">
        <router-link class="item-link" to="/Item">Items</router-link>
      </div>
      <router-link to="/usuario" class="btn" v-if="$store.state.login">{{nome}}</router-link>
      <router-link v-else to="/login" class="btn">Login</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  computed: {
    nome() {
      return this.$store.state.usuario.nome.replace(/ .*/, "");
    }
  }
};
</script>

<style scoped>
header {
  margin: 20px 20px 0 20px;
  background: #fff;
  border-radius: 4px;
  width: 97%;
  position: fixed;
}

nav {
  display: grid;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  grid-template-columns: 100px 1fr 100px;
  grid-gap: 20px;
}

.btn {
  float: right;
}

.logo img {
  width: 80px;
  height: 50px;
}

.menu {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
}

.menu a {
  text-align: end;
}

.item-link {
  text-transform: uppercase;
  float: right;
}

.item-link:hover {
  color: #d4af17;
}
</style>