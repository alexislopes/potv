<template>
  <div class="cartao-list container">
    <!-- <a class="ui teal label">Items: {{ items.length }}</a> -->
    <div v-for="item in items" :key="item._id" class="cartao grid-1-3">
      <div class="data">
        <h1>{{format(new Date(item.priceData[0].timestamp))}}</h1>
      </div>
      <div class="cartao-content">
        <div class="cartao-header">
          <div class="cartao-title">
            <h2>{{item.priceData[0].local}}</h2>
            <!-- <span>18:35</span> -->
          </div>

          <div class="marcador">
            <span class="rotulo orange">Débito</span>
            <span class="rotulo green">R$ {{ item.priceData[0].price }}</span>
          </div>
        </div>
        <div class="cartao-body">
          <div class="item">
            <span class="item-qtd rotulo borded">2</span>
            <span class="item-name">Leite Desnatado</span>
          </div>
          <div class="item">
            <span class="item-qtd rotulo borded">4</span>
            <span class="item-name">Biscoito de Cacau</span>
          </div>
        </div>
        <div class="cartao-footer">
          <button>Ver Mais</button>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="cards">
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
  </div>-->
</template>

<style scoped>
.cartao {
  margin-bottom: 20px;
}

.cartao-list {
  margin-bottom: 2em;
  margin-top: 60px;
}

.data h1 {
  font-size: 18px;
  margin-bottom: 5px;
  margin-left: -90px;
}

.cartao-title {
  padding: 5px 0;
  text-align: center;
}

.cartao-title {
  margin-bottom: 15px;
}

.cartao-content {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 1px rgba(163, 163, 163, 1);
}

.cartao-body div {
  display: block;
}

.item {
  display: inline-block;
  margin: 10px;
}

.rotulo {
  padding-top: 0.1em;
  padding-bottom: 0.1em;
  padding-right: 0.2em;
  padding-left: 0.2em;
  border-radius: 3px;
  text-transform: uppercase;
  font-weight: bold;
}

.item-qtd {
  font-size: 16px;
}

.rotulo.orange {
  background-color: orange;
}

.rotulo.green {
  background-color: green;
}

.rotulo.borded {
  border: 1px solid #ccc;
}

.marcador {
  display: inline-block;
  margin: 0 10px;
  text-align: center;
}

.cartao-header h2 {
  text-align: center;
  margin-bottom: 1px;
}

.cartao-header:after,
.cartao-body:after {
  content: "";
  border: 1px solid #ccc;
  display: block;
  margin: 10px;
  width: 95%;
}

.cartao-footer {
  text-align: center;
}

.cartao-footer button {
  background: none;
  border: none;
  height: 100%;
  width: 100%;
  padding: 0.6em;
  text-transform: uppercase;
  cursor: pointer;
}

.item-name {
  margin-left: 10px;
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
        " • " +
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
