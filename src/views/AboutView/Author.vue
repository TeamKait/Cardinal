<script setup lang="ts">
const props = defineProps({
  name: {type: String, required: true},
  description: {type: String, required: true},
})
</script>

<template>
  <div class="flex-center flex-col gap-4 border p-5 rounded-xl hover:bg-secondary/20 group">
    <h1 class="text-5xl font-bold group-hover:text-primary transition-colors">
      {{ name }}
    </h1>
    <p class="text-2xl font-thin">{{ description }}</p>
  </div>
</template>