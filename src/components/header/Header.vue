<script setup lang="ts">
import RouteButton from "@/components/customUI/buttons/RouteButton.vue";
import UserLink from "@/components/header/UserLink.vue";
import ThemeSelector from "@/components/header/ThemeSelector.vue";

const otherRoutes = ['/settings', '/about', '/admin'];
</script>

<template>
  <div class="w-full h-25 flex items-center justify-between border-b bg-secondary/10">
    <!-- home route -->
    <RouteButton to="/" class="text-6xl font-semibold border-r h-full flex-center px-10"/>

    <div class="flex-center h-full">
      <!-- Theme selector -->
      <div class="flex-center h-full px-5 border-l">
        <ThemeSelector/>
      </div>

      <!-- user route -->
      <UserLink/>
    </div>
  </div>
</template>