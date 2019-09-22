<template>
  <form class="ui form container" @submit.prevent="insert">
    <div class="field">
      <input type="text" required v-model="name" name="name" placeholder="Nome" />
    </div>

    <verte v-model="color" model="hex"></verte>

    <div class="field">
      <input id="btn-salvar" class="ui secondary button" value="Salvar" type="submit" />
    </div>
  </form>
</template>

<style scoped>
.box {
  width: 90%;
}

#btn-salvar {
  float: left;
  text-align: center;
}
</style>


<script lang="ts">
import Vue from "vue";
import axios from "axios";
import Verte from "verte";
import "verte/dist/verte.css";
export default Vue.extend({
  data() {
    return {
      name: null,
      color: null
    };
  },
  methods: {
    insert() {
      const tag = { name: this.name, color: this.color };

      axios.post("/tag", tag).then(res => {
        if (res.status === 201) {
          alert("criou: " + res.data.tag.name);
        }
      });
    }
  },
  components: {
    Verte
  }
});
</script>

