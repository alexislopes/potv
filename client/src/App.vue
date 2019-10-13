<template>
  <div id="app">
    <TheHeader />
    <main id="main">
      <transition mode="out-in">
        <router-view />
      </transition>
      <Aviso
        v-if="$store.state.aviso.mensagem"
        :mensagem="$store.state.aviso.mensagem"
        :tipo="$store.state.aviso.tipo"
      />
    </main>
    <TheFooter />
  </div>
</template>

<style>
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1;
}

* {
  box-sizing: border-box;
}

label {
  margin-bottom: 5px;
}

input,
textarea,
select {
  border-radius: 4px;
  border: 1px solid white;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
  font-size: 1rem;
  font-family: "Avenir", Arial, Helvetica, sans-serif;
  margin-bottom: 15px;
  width: 100%;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus,
select:hover,
select:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: #d4af37;
}

body,
ul,
li,
h1,
h2,
p {
  padding: 0;
  margin: 0;
}

ul {
  list-style: none;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  color: #345;
  background: url("./assets/pattern.svg");
}

a {
  color: #345;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

.btn {
  display: block;
  padding: 10px 30px;
  background: #d4af37;
  border-radius: 4px;
  color: white;
  text-align: center;
  font-size: 1rem;
  box-shadow: rgba(30, 60, 90, 0.2);
  transition: all 0.3s;
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}

.btn:hover {
  background-color: #d4af17;
  transform: scale(1.1);
}

.v-enter-to {
  transform: translate3d(-20px, 0, 0);
}

.v-leave-to {
  transform: translate3d(20px, 0, 0);
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
</style>

<script>
import TheHeader from "../src/components/TheHeader";
import TheFooter from "../src/components/TheFooter";
import Aviso from "@/components/Aviso.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
    Aviso
  }
};
</script>
