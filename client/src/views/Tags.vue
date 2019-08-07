<template>
    <div class="items">
        <TagList />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TagList from "@/components/TagList.vue";

@Component({
    components: {
        TagList
    }
})

export default class Tag extends Vue {}
</script>

