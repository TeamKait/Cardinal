<script setup lang="ts">
import CircleButton from "@/components/customUI/buttons/CircleButton.vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import PostComponent from "@/components/PostComponent.vue";
import {usePosts} from "@/stores/Post.store.ts";
import {onMounted, ref} from "vue";
import {Spinner} from "@/components/ui/spinner";
import {LoadingAction} from "@/ts/TryAction.ts";

const posts = usePosts();
const loading = ref(true);

onMounted(async () => {
  await LoadingAction(async () => {
    await posts.LoadPosts();
  }, loading)
})
</script>

<template>
  <CircleButton @click="posts.NewPost" variant="default" class="size-20 fixed right-5 bottom-5">
    <SafeIcon icon="radix-icons:plus" class="size-10"/>
  </CircleButton>

  <Spinner v-if="loading && posts.posts.length == 0" class="size-10"/>
  <div class="flex flex-col gap-5">
    <PostComponent v-for="post in posts.posts" :key="post.id ?? post.label" :post="post" />
  </div>
</template>