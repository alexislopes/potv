<template>
  <transition-group class="nota-card" mode="out-in">
    <h1 key="title">{{nota.title}}</h1>
    <!-- <p>{{nota.items.length}} Itens</p> -->
    <!-- <p>{{nota.getTotal()}}</p> -->
    <p key="timestamp">{{nota.timestamp}}</p>
  </transition-group>
</template>

<script>
import Nota from "@/models/Nota.ts";
export default {
  props: ["Nota"],
  computed: {
    nota() {
      return new Nota(Nota);
    }
  }
};
</script>

<style scoped>
</style>