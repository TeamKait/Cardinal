<script setup lang="ts">
import type {HTMLAttributes} from "vue";

const props = defineProps<{
  text: string,
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
<p :class="props.class">{{ text }}</p>
</template>