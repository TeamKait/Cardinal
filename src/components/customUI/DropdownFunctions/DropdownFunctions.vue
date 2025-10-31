<script setup lang="ts">
import {DropdownFunction} from "@/components/customUI/DropdownFunctions/DropdownFunction.ts";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu";

import SafeIcon from "@/components/customUI/SafeIcon.vue";

const props = defineProps({
  functions: Array<DropdownFunction>
})
</script>

<template>
<DropdownMenu>
  <DropdownMenuTrigger as-child>
    <slot/>
  </DropdownMenuTrigger>

  <DropdownMenuContent>
    <DropdownMenuItem v-for="f in functions" @click="() => f.func()">
      <SafeIcon v-if="f.icon" :icon="f.icon"/>
      <p>{{ f.text }}</p>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
</template>