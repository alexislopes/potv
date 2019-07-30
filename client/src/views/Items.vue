<template>
    <div class="items">
        <ItemList />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ItemList from "@/components/ItemList.vue";

@Component({
    components: {
        ItemList
    }
})

export default class Item extends Vue {}
</script>

