<template>
<div class="cards">
    <p class="discription">Tags cadastradas: {{tags.length}}</p>
<div v-for="tag in tags" :key="tag.id" class="ui card">
  <div class="content">
    <div class="header">{{tag.name}}</div>
    <div class="description">
      <p>{{tag.color}}</p>
    </div>
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
            tags: []
        }
    },
    methods: {
        async find() {
            await axios.get("/tag").then(res => { this.tags = res.data.tags })
            console.log(this.tags);
        }
    }
})
</script>

