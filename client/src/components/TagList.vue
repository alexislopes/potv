<template>
<div class="cards">
    <a class="ui teal label">Tags: {{tags.length}}</a>
<div v-for="tag in tags" :key="tag.id" class="ui card">
  <div class="content">
    <div class="stripe"></div>
    <div :id="tag._id" class="header">{{tag.name}}</div>
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

p {
  border-radius: 2em;
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
            this.tags.forEach(e => {
              let p = document.getElementById(e._id);
              p.setAttribute("style",  "color: " + e.color); 
            });
        }
    }
})
</script>

