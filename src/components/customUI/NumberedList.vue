<script setup lang="ts">
const props = defineProps({
  items: {type: Array<any>, required: true},
})
</script>

<template>
<p v-for="(item, i) in items"><span class="select-none text-muted-foreground">{{ i + 1 }}. </span>{{ item }}</p>
</template>