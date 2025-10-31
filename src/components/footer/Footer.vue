<script setup lang="ts">
import {useRouter} from "vue-router";
import SafeIcon from "@/components/customUI/SafeIcon.vue";

const routes = useRouter().options.routes;
</script>

<template>
  <div class="flex items-start p-5 w-full h-40 gap-10 border-t-2 bg-secondary/10 text-muted-foreground/50 group">
    <div class="flex flex-col">
      <RouterLink v-for="r in routes" :to="r.path" class="transition-colors hover:text-white">
        {{ r.name }}
      </RouterLink>
    </div>

    <div class="h-full">
      <a class="flex-center gap-2 transition-colors hover:text-white" href="https://github.com/TeamKait/Arvavir" target="_blank">
        <SafeIcon icon="radix-icons:github-logo"/>
        Репозиторий проекта
      </a>
    </div>
  </div>
</template>