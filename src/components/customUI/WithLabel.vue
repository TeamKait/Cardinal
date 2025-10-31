<script setup lang="ts">
const props = defineProps<{
  label: string,
  position: 'left' | 'right' | 'top' | 'bottom',
}>()

function IsPos(positionName: string): boolean {
  return props.position == positionName
}
</script>

<template>
<div class="flex gap-1" :class="{'flex-col':IsPos('top') || IsPos('bottom')}">
  <template v-if="IsPos('left') || IsPos('top')">
    <label>{{ props.label }}</label>
  </template>

  <slot/>

  <template v-if="IsPos('right') || IsPos('bottom')">
    <label>{{ props.label }}</label>
  </template>
</div>
</template>