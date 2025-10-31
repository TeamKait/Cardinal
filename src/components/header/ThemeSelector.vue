<script setup lang="ts">
import IconButton from "@/components/customUI/buttons/IconButton.vue";
import {ref} from "vue";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useColorMode} from "@vueuse/core";
import type {ColorTheme} from "@/ts/ColorTheme.ts";
import SafeIcon from "@/components/customUI/SafeIcon.vue";

const modes = {
  "light": "radix-icons:sun",
  "dark": "radix-icons:moon",
  "auto": "radix-icons:cube",
}

const russianModes = {
  'light': 'светлая',
  'dark': 'темная',
  'auto': 'авто'
}

const open = ref(false);

function GetIcon(mode: ColorTheme): string {
  return modes[mode]
}

function GetTitle(mode: ColorTheme): string {
  return russianModes[mode]
}

const mode = useColorMode({
  disableTransition: false
});

function SetTheme(theme: ColorTheme) {
  mode.value = theme
}
</script>

<template>
  <div class="relative" v-click-outside="() => open = false">
    <!-- open menu button -->
    <Button @click="open = !open"
            :icon="GetIcon(mode as any)"
            size="icon"
            class="size-13"
            variant="outline">
      <SafeIcon
          :icon="GetIcon(mode as any)"
          class="transition-transform duration-500 size-6"
          :class="{'rotate-360':open}"/>
    </Button>

    <!-- select theme -->
    <transition name="menu">
      <Card v-if="open" class="absolute gap-3 p-4 -left-20 mt-2 z-999">
        <IconButton v-for="(icon, modeKey) in modes"
                    @click="() => SetTheme(modeKey as ColorTheme)"
                    :icon="icon"
                    :variant="(mode as any) == modeKey ? 'default' : 'outline'"
                    class="flex justify-between">
          {{ GetTitle(modeKey as ColorTheme) }}
        </IconButton>
      </Card>
    </transition>
  </div>
</template>