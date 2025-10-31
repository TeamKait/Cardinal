<script setup lang="ts">
import {Button} from "@/components/ui/button";
</script>

<template>
  <Button size="icon" variant="outline" class="flex-center rounded-full">
    <slot/>
  </Button>
</template>