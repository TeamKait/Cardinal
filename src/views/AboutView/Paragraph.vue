<script setup lang="ts">
import SafeIcon from "@/components/customUI/SafeIcon.vue";

const props = defineProps({
  label: {type: String, required: true},
})
</script>

<template>
  <div class="flex flex-col" :id="label">
    <a class="text-7xl font-thin border-b-5 py-5 my-5 uppercase hover:cursor-pointer transition-colors hover:text-primary"
    :href="'#' + label">{{
        label
      }}</a>
    <p class="text-3xl w-200">
      <slot/>
    </p>
  </div>
</template>