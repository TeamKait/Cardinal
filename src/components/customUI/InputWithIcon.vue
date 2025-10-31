<script setup lang="ts">
import {Input} from "@/components/ui/input";
import SafeIcon from "@/components/customUI/SafeIcon.vue";

const props = defineProps({
  icon: {type: String, required: true},
  placeholder: {type: String, default: ""},
  type: {type: String, default: "text"},
})

const model = defineModel<any>();
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input v-model="model" :type="type" :placeholder="placeholder" class="pl-10" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <SafeIcon :icon="icon" class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>