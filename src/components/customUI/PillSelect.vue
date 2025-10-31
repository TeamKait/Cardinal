<script setup lang="ts">
import {Button} from "@/components/ui/button";

const props = defineProps<{
  options: any[],
}>()

const model = defineModel<any>()
</script>

<template>
  <div class="flex gap-2">
    <Button v-for="o in options"
            :key="o"
            @click="model = o"
            class="rounded-full px-5"
            :variant="o === model ? 'default' : 'outline'">
      {{ o }}
    </Button>
  </div>
</template>