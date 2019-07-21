<template>
    <div class="item">
        <h1>Adicione um Item</h1>
        <FormItem />
    </div>
</template>

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


