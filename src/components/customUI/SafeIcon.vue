<script setup lang="ts">
import {Icon, loadIcon} from "@iconify/vue"
import {Skeleton} from "@/components/ui/skeleton";
import {onMounted, ref} from "vue";

const props = defineProps<{
  icon: string
}>()

const loaded = ref(false);
onMounted(async () => {
  await loadIcon(props.icon)
  loaded.value = true
})
</script>

<template>
  <Icon v-if="loaded" :icon="icon"/>
  <Skeleton v-else class="rounded-full"/>
</template>