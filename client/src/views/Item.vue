<template>
  <div class="item container">
    <FormItem />
  </div>
</template>

<style  scoped>
.item {
  margin-top: 100px;
}

.nota-list a,
.item-list a {
  cursor: pointer;
  color: #000000;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 14px;
  line-height: 20px;
  padding: 10px 0;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FormItem from "@/components/FormItem.vue";

@Component({
  components: {
    FormItem
  }
})
export default class Item extends Vue {}
</script>


