<template>
<div class="cards">
    <a class="ui teal label">Items: {{items.length}}</a>
<div v-for="item in items" :key="item.id" class="ui card">
  <div class="content">
    <div class="header">{{item.name}}</div>
    <div class="description">
      <p>R$ {{item.priceData[0].price}}</p>
    </div>
  </div>
  <div class="extra content">
    <p>{{format(new Date(item.priceData[0].timestamp))}}</p>
</div>
  <div class="extra content">
    <p>{{item.priceData[0].local}}</p>
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
        },
        format(date: Date){
            return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " - " + date.getHours() + ":" + date.getMinutes();
        }
    }
})
</script>

