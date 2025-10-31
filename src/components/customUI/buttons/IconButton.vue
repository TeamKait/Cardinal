<script setup lang="ts">
import {Button} from "@/components/ui/button";
import type {HTMLAttributes} from "vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";

const props = withDefaults(defineProps<{
  icon: string;
  textStart?: boolean;
  iconClass?: HTMLAttributes['class'];
}>(), {
  textStart: false,
})
</script>

<!-- TODO: skeleton for loading icons -->
<template>
  <Button v-bind="$attrs" class="text-xl flex justify-start">
    <template v-if="props.textStart">
      <slot/>
    </template>

    <SafeIcon :icon="props.icon" :class="props.iconClass"/>

    <template v-if="!props.textStart">
      <slot/>
    </template>
  </Button>
</template>