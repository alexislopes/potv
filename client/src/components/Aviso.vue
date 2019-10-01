<template>
  <transition mode="out-in">
    <div id="aviso" class="box">
      <i v-if="tipo === 'success'" class="fas fa-check-circle success"></i>
      <i v-else class="fas fa-times-circle failed"></i>
      <p>{{mensagem}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Aviso",
  props: ["mensagem", "tipo"]
};
</script>

<style scoped>
.box {
  display: grid;
  position: fixed;
  max-width: 500px;
  height: 50px;
  transition: all 0.3s;
  background: white;
  right: 0px;
  bottom: 0px;
  border-radius: 4px;
  text-align: center;
  padding: 10px;
  margin: 30px 50px;
  z-index: 10;
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  grid-template-columns: 30px auto;
  border: 1px solid #ccc;
  box-shadow: rgba(30, 60, 90, 0.5);
}

.box i {
  font-size: 30px;
  text-align: start;
  grid-column: 1;
}

.box .success {
  color: lightgreen;
}

.box .failed {
  color: brown;
}

.box p {
  text-align: start;
  grid-column: 2;
  display: block;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 5px;
}

.box:hover {
  transform: scale(1.1);
}
</style>
