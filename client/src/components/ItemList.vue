<template>
<div class="cards">
    <p class="discription">Itens cadastrados: {{items.length}}</p>
<div v-for="item in items" :key="item.id" class="ui card">
  <div class="content">
    <div class="header">{{item.name}}</div>
    <div class="description">
      <p>R$ {{item.priceData.price}}</p>
    </div>
  </div>
  <div class="extra content">
    <p>{{format(new Date(item.priceData.timestamp))}}</p>
</div>
  <div class="extra content">
    <p>{{item.priceData.local}}</p>
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

<script lang="ts">
import Vue from 'vue'
import axios from "axios"

export default Vue.extend({
    mounted() {
        this.find();
    },
    data() {
        return {
            items: []
        }
    },
    computed: {
        
    },
    methods: {
        async find() {
            await axios.get("/item").then(res => { this.items = res.data.items })
            console.log(this.items);
        },
        format(date){
            return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " - " + date.getHours() + ":" + date.getMinutes();
        }
    }
})
</script>

