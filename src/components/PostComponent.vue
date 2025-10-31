<script setup lang="ts">
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {Post} from "@/ts/firebase/PostData/post.model.ts";
import CircleButton from "@/components/customUI/buttons/CircleButton.vue";
import { usePosts } from "@/stores/Post.store.ts";
import { getAuth } from 'firebase/auth'
import { computed } from 'vue'

const props = defineProps<{ post?: Post }>()
const store = usePosts()
const auth = getAuth()

const uid = computed(() => auth.currentUser?.uid)
const liked = computed(() => !!props.post && !!uid.value && props.post.likesBy?.includes(uid.value))
const disliked = computed(() => !!props.post && !!uid.value && props.post.dislikesBy?.includes(uid.value))

const likeIcon = computed(() => liked.value ? 'mdi:thumbs-up' : 'mdi:thumbs-up-outline')
const dislikeIcon = computed(() => disliked.value ? 'mdi:thumbs-down' : 'mdi:thumbs-down-outline')
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center gap-3">
        <Avatar class="size-15">
          <AvatarFallback>
            <SafeIcon icon="radix-icons:person" class="size-7"/>
          </AvatarFallback>
        </Avatar>

        <h1 class="text-2xl">{{ post?.user ?? 'NULL_USER' }}</h1>
      </div>
    </CardHeader>

    <CardContent class="w-150">
      <h1 class="text-5xl">{{ post?.label ?? 'NULL_LABEL' }}</h1>
      <p class="text-2xl">{{ post?.content ?? 'NULL_CONTENT' }}</p>

      <div class="flex gap-2 mt-2 items-center">
        <CircleButton @click="store.ToggleLike(post!)" variant="outline">
          <div class="flex items-center gap-1">
            <SafeIcon :icon="likeIcon"/>
            <span class="text-sm">{{ post?.likesCount ?? 0 }}</span>
          </div>
        </CircleButton>
        <CircleButton @click="store.ToggleDislike(post!)" variant="outline">
          <div class="flex items-center gap-1">
            <SafeIcon :icon="dislikeIcon"/>
            <span class="text-sm">{{ post?.dislikesCount ?? 0 }}</span>
          </div>
        </CircleButton>
      </div>
    </CardContent>
  </Card>
</template>