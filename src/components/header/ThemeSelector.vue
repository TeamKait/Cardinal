<script setup lang="ts">
import IconButton from "@/components/customUI/buttons/IconButton.vue";
import {ref, watch} from "vue";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useColorMode} from "@vueuse/core";
import type {ColorTheme} from "@/ts/ColorTheme.ts";
import {useAccountData} from "@/stores/AccountData.store.ts";
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

// TODO: fetch from UserPrefs
const data = useAccountData();
const open = ref(false);

function GetIcon(mode: ColorTheme): string {
  return modes[mode]
}

function GetTitle(mode: ColorTheme): string {
  return russianModes[mode]
}

function SetTheme(theme: ColorTheme) {
  data.data.colorTheme = theme
  mode.value = theme
}

const mode = useColorMode({
  disableTransition: false
});

// Keep theme in sync with store changes (login/logout/refresh)
watch(() => data.data.colorTheme, (val) => {
  mode.value = val
}, { immediate: true })
</script>

<template>
  <div class="relative" v-click-outside="() => open = false">
    <!-- open menu button -->
    <Button @click="open = !open"
            :icon="GetIcon(data.data.colorTheme)"
            size="icon"
            class="size-13"
            variant="outline">
      <SafeIcon
          :icon="GetIcon(data.data.colorTheme)"
          class="transition-transform duration-500 size-6"
          :class="{'rotate-360':open}"/>
    </Button>

    <!-- select theme -->
    <transition name="menu">
      <Card v-if="open" class="absolute gap-3 p-4 -left-20 mt-2 z-999">
        <IconButton v-for="(icon, mode) in modes"
                    @click="() => SetTheme(mode)"
                    :icon="icon"
                    :variant="data.data.colorTheme == mode ? 'default' : 'outline'"
                    class="flex justify-between">
          {{ GetTitle(mode) }}
        </IconButton>
      </Card>
    </transition>
  </div>
</template>