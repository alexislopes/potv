<template>
<div class="items">
<div class="cards">
    <h1>{{currentItem.name}}</h1>

    <div v-for="priced in priceDataList" :key="priced.id" class="ui card">
        <div class="content">
            <a class="header">{{format(new Date(priced.timestamp))}}</a>
            <div class="meta">
                <span class="date">{{priced.price}}</span>
            </div>
            <div class="description">
                {{priced.brand}}
            </div>
        </div>
    <div class="extra content">
        <a>
            {{priced.local}}
        </a>
    </div>
</div>

</div>
</div>
</template>

<style scoped>
.items {
  display: flex;
  justify-content: center;

}
</style>

<script>
import Vue from 'vue'
import axios from "axios";
import { mapState } from "vuex";

export default Vue.extend({
    computed: {
        ...mapState(["selectedItemId"])
    },
    mounted() {
        this.selectedItem = this.selectedItemId
        this.fetchItem();
    },
    methods: {
        async fetchItem(){
            console.log(this.selectedItem);
            const item = await axios.get("/itemById", { params: { id: this.selectedItem }})
            console.log(item)
            this.currentItem = item.data.item;
            this.priceDataList = item.data.item.priceData
            console.log(item);
        },
        format(date){
          let dia = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
          let mes = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
          let minutos = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];

          let minute = date.getMinutes();
          if(date.getMinutes() < 10){
            minute = minutos[date.getMinutes()]
          }

          return dia[date.getDay()] + " " + date.getDate() + " " + mes[date.getMonth()] + " " + date.getFullYear() + " " +  date.getHours() + ":" + minute;
            // return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " - " + date.getHours() + ":" + date.getMinutes();
        }
    },
    data() {
        return {
            selectedItem: null,
            currentItem: null,
            priceDataList: null
        }
    }
})
</script>