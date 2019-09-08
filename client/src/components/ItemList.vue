<template>
  <div class="cards">
    <a class="ui teal label">Items: {{ items.length }}</a>
    <div v-for="item in items" :key="item.id" class="ui card">
      <div :id="item._id" @click="openItem($event)" class="content">
        <div class="header">{{ item.name }}</div>
        <div class="description">
          <p>R$ {{ item.priceData[0].price }}</p>
        </div>
      </div>
      <div class="extra content">
        <p>{{ format(new Date(item.priceData[0].timestamp)) }}</p>
      </div>
      <div class="extra content">
        <p>{{ item.priceData[0].local }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.items {
  display: flex;
  justify-content: center;
}

.cards {
  margin-bottom: 2em;
}
</style>

<script lang="js">
import Vue from "vue";
import axios from "axios";
import { mapMutations } from "vuex";

export default Vue.extend({
  mounted() {
    this.find();
  },
  data() {
    return {
      items: []
    };
  },
  computed: {},
  methods: {
    ...mapMutations(["setSelectedItemId"]),
    async find() {
      await axios.get("/item").then(res => {
        this.items = res.data.items;
        console.log(this.items);
      });
    },
    format(date) {
      let dia = [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab" ];
      let mes = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez"
      ];
      let minutos = [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09"
      ];

      let minute = date.getMinutes();
      if (date.getMinutes() < 10) {
        minute = minutos[date.getMinutes()];
      }

      return (
        dia[date.getDay()] +
        " " +
        date.getDate() +
        " " +
        mes[date.getMonth()] +
        " " +
        date.getFullYear() +
        " " +
        date.getHours() +
        ":" +
        minute
      );
      // return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " - " + date.getHours() + ":" + date.getMinutes();
    },
    openItem(e) {
      this.setSelectedItemId(e.currentTarget.id);
      console.log(e);
      this.$router.push("/itemDetails");
    }
  }
});
</script>
