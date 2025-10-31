<script setup lang="ts">
import CircleButton from "@/components/customUI/buttons/CircleButton.vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import PostComponent from "@/components/PostComponent.vue";
import {usePosts} from "@/stores/Post.store.ts";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {Spinner} from "@/components/ui/spinner";
import {LoadingAction} from "@/ts/TryAction.ts";
import {getAuth, onAuthStateChanged, type User} from "firebase/auth";
import {toast} from "vue-sonner";

const auth = getAuth();
// Track auth state reactively so UI updates when user logs in/out
const currentUser = ref<User | null>(auth.currentUser);
const isAuthed = computed(() => !!currentUser.value);

const posts = usePosts();
const loading = ref(true);

let unsubscribe: (() => void) | undefined;

onMounted(async () => {
  // Subscribe to Firebase auth state changes
  unsubscribe = onAuthStateChanged(auth, (u) => {
    currentUser.value = u;
  });

  await LoadingAction(async () => {
    await posts.LoadPosts();
  }, loading)
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
})

function OnPlus(){
  if(isAuthed.value){
    posts.NewPost();
  }
  else{
    toast.warning("Войдите или создайте аккаунт, чтобы создать пост")
  }
}
</script>

<template>
  <CircleButton @click="OnPlus" :variant="isAuthed ? 'default' : 'outline'" class="size-20 fixed right-5 bottom-5">
    <SafeIcon icon="radix-icons:plus" class="size-10"/>
  </CircleButton>

  <Spinner v-if="loading && posts.posts.length == 0" class="size-10"/>
  <div class="flex flex-col gap-5">
    <PostComponent v-for="post in posts.posts" :key="post.id ?? post.label" :post="post" />
  </div>
</template>