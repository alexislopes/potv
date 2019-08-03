<template>
    <div class="item">
        <FormTag />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FormTag from "@/components/FormTag.vue";

@Component({
    components: {
        FormTag
    }
})

export default class Tag extends Vue {}
</script>


