<template>
  <transition mode="out-in">
    <div class="tile">
      <h1>{{title}}</h1>
      <p>{{value | numeroPreco}}</p>
    </div>
  </transition>
</template>

<script>
import { DashboardServices } from "../services/DashboardServices";
import axios from "axios";
import Nota from "../models/Nota";

export default {
  data() {
    return {
      value: 0
    };
  },
  props: ["title", "endpoint", "total"],
  async created() {
    // console.log("endpoint: ", this.endpoint);
    // console.log("title: ", this.title);
    // console.log("total: ", this.total);
    // console.log();

    let value = 0;

    if (this.endpoint) {
      await axios.get(this.endpoint).then(res => {
        res.data.value.forEach(e => {
          let nota = new Nota(e);
          this.value += nota.getTotal();
        });
      });
    }

    if (this.total) {
      // console.log("do TIle: ", total);
      this.value = this.total;
    }
  }
};
</script>

<style scoped>
.tile {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
  border: 1px solid #ccc;
}

.tile:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.tile h1 {
  text-align: center;
}

.tile p {
  text-align: center;
  padding: 45px 0;
  font-size: 1.5em;
}
</style>