import { ref } from 'vue'
import { defineStore } from 'pinia'
import { DialogComponent, useCommonDialog } from '@/stores/CommonDialog.ts'
import NewPostDialog from '@/components/dialogs/NewPostDialog.vue'
import type { Post } from '@/ts/firebase/PostData/post.model.ts'
import { createPost, getPosts as fetchPosts, toggleLike as apiToggleLike, toggleDislike as apiToggleDislike } from '@/ts/firebase/PostData/post.controller.ts'
import { auth } from '@/ts/firebase/firebase.ts'
import { toast } from 'vue-sonner'

export const usePosts = defineStore('posts', () => {
  const dialog = useCommonDialog()
  const posts = ref<Post[]>([])

  async function LoadPosts() {
    const res = await fetchPosts()
    if (res) posts.value = res
  }

  async function NewPost() {
    const results = await dialog.DialogResults('Новый пост', new DialogComponent(NewPostDialog))
    if (!results || !results.length) return
    const post = results[0] as Post
    const created = await createPost(post)
    if (created) {
      await LoadPosts()
    }
  }

  async function ToggleLike(post: Post) {
    if (!post?.id) return
    const uid = auth.currentUser?.uid
    if (!uid) {
      toast.error('Войдите, чтобы поставить реакцию')
      return
    }

    const prevLikes = [...(post.likesBy ?? [])]
    const prevDislikes = [...(post.dislikesBy ?? [])]

    const hasLiked = post.likesBy?.includes(uid)
    if (hasLiked) {
      // Optimistic: remove like
      post.likesBy = (post.likesBy ?? []).filter(x => x !== uid)
    } else {
      // Optimistic: add like and remove potential dislike
      const addLike = (post.likesBy ?? []).includes(uid) ? (post.likesBy ?? []) : [...(post.likesBy ?? []), uid]
      const removeDislike = (post.dislikesBy ?? []).filter(x => x !== uid)
      post.likesBy = addLike
      post.dislikesBy = removeDislike
    }

    const ok = await apiToggleLike(post.id, uid)
    if (!ok) {
      // Rollback on failure
      post.likesBy = prevLikes
      post.dislikesBy = prevDislikes
    }
  }

  async function ToggleDislike(post: Post) {
    if (!post?.id) return
    const uid = auth.currentUser?.uid
    if (!uid) {
      toast.error('Войдите, чтобы поставить реакцию')
      return
    }

    const prevLikes = [...(post.likesBy ?? [])]
    const prevDislikes = [...(post.dislikesBy ?? [])]

    const hasDisliked = post.dislikesBy?.includes(uid)
    if (hasDisliked) {
      // Optimistic: remove dislike
      post.dislikesBy = (post.dislikesBy ?? []).filter(x => x !== uid)
    } else {
      // Optimistic: add dislike and remove potential like
      const addDislike = (post.dislikesBy ?? []).includes(uid) ? (post.dislikesBy ?? []) : [...(post.dislikesBy ?? []), uid]
      const removeLike = (post.likesBy ?? []).filter(x => x !== uid)
      post.dislikesBy = addDislike
      post.likesBy = removeLike
    }

    const ok = await apiToggleDislike(post.id, uid)
    if (!ok) {
      // Rollback on failure
      post.likesBy = prevLikes
      post.dislikesBy = prevDislikes
    }
  }

  return { posts, LoadPosts, NewPost, ToggleLike, ToggleDislike }
})
