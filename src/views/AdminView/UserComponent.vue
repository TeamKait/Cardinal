<script setup lang="ts">
import IconButton from "@/components/customUI/buttons/IconButton.vue";
import {User} from "@/ts/firebase/users/user.model.ts";
import {Skeleton} from "@/components/ui/skeleton";
import {computed} from "vue";
import {CopyToClipboard} from "@/ts/utils.ts";
import SafeIcon from "@/components/customUI/SafeIcon.vue";

const props = defineProps<{
  user?: User | null;
  loaded: boolean;
  open: boolean;
}>()

const emit = defineEmits(['toggle'])
const date = computed(() => {
  const d = props.user?.date;
  if(!d) return "N/A";

  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
})
</script>

<template>
  <div
      class="relative flex items-start w-130 border-2 p-3 rounded-xl text-xl transition-all overflow-hidden hover:bg-secondary/20"
      :class="{'h-20':!open, 'h-30':open}">
    <Skeleton v-if="!loaded" class="size-full"/>

    <template v-else>
      <div class="flex items-center gap-3 pr-28">
        <div class="p-3 text-3xl bg-secondary rounded-full border-2 flex-shrink-0">
          <SafeIcon icon="radix-icons:person"/>
        </div>

        <div class="flex flex-col min-w-0">
          <h1 class="truncate">{{ user?.login }}</h1>

          <div
              class="text-muted-foreground/50 w-max overflow-hidden transition-all duration-200 ease-in-out"
              :style="{ maxHeight: open ? '80px' : '0px', opacity: open ? 1 : 0 }">
            <p>ID: {{ user?.id }}</p>
            <p>Date: {{ date }}</p>
          </div>
        </div>
      </div>

      <!-- Правый блок: делаем absolute, чтобы он не сдвигал содержимое -->
      <div class="absolute right-3 flex flex-col items-center gap-1">
        <IconButton
            @click="emit('toggle')"
            icon="radix-icons:chevron-up"
            size="icon"
            variant="outline"
            class="flex-center rounded-full p-5 transition-transform duration-200"
            :class="{'rotate-180':open}"/>
        <div
            class="transition-all duration-200 ease-in-out"
            :style="{ maxHeight: open ? '200px' : '0px', opacity: open ? 1 : 0 }">
          <IconButton
              @click="() => CopyToClipboard(JSON.stringify(user))"
              icon="radix-icons:copy"
              size="icon"
              variant="outline"
              class="flex-center rounded-full p-5"
              icon-class="size-5"/>
        </div>
      </div>
    </template>
  </div>
</template>
