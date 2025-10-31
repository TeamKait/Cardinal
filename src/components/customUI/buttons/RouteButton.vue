<script setup lang="ts">
import {useRouter} from "vue-router";

const props = defineProps({
  to: {type: String, required: true}
})

const router = useRouter();
const name = router.options.routes.find(route => route.path === props.to)?.name;
</script>

<template>
  <RouterLink :to="props.to" class="hover:text-primary transition-colors">
    {{ name || 'PATH NOT FOUND' }}
  </RouterLink>
</template>