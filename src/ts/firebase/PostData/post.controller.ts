import { db } from '@/ts/firebase/firebase.ts'
import { collection, addDoc, getDocs, serverTimestamp, doc, arrayUnion, arrayRemove, runTransaction } from 'firebase/firestore'
import { TryAction } from '@/ts/TryAction.ts'
import { Post } from '@/ts/firebase/PostData/post.model.ts'

const POSTS_COLLECTION = 'posts'

export async function createPost(post: Post) {
  return await TryAction(async () => {
    await addDoc(collection(db, POSTS_COLLECTION), {
      user: post.user,
      label: post.label,
      content: post.content,
      likesBy: [],
      dislikesBy: [],
      createdAt: serverTimestamp()
    })
    return true
  })
}

export async function getPosts() {
  return await TryAction(async () => {
    const snapshot = await getDocs(collection(db, POSTS_COLLECTION))
    const posts = snapshot.docs.map(d => {
      const data: any = d.data()
      const createdAt = data?.createdAt?.toDate ? data.createdAt.toDate() as Date : undefined
      return new Post(
        data?.user ?? 'N/A',
        data?.label ?? '',
        data?.content ?? '',
        d.id,
        data?.likesBy ?? [],
        data?.dislikesBy ?? [],
        createdAt
      )
    })
    return posts as Post[]
  })
}

export async function toggleLike(postId: string, uid: string) {
  return await TryAction(async () => {
    const ref = doc(db, POSTS_COLLECTION, postId)
    await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(ref)
      const data = (snap.data() as any) || {}
      const likes: string[] = data.likesBy ?? []
      // Toggle off if already liked, else add like and remove dislike
      if (likes.includes(uid)) {
        transaction.update(ref, { likesBy: arrayRemove(uid) })
      } else {
        transaction.update(ref, { likesBy: arrayUnion(uid), dislikesBy: arrayRemove(uid) })
      }
    })
    return true
  })
}

export async function toggleDislike(postId: string, uid: string) {
  return await TryAction(async () => {
    const ref = doc(db, POSTS_COLLECTION, postId)
    await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(ref)
      const data = (snap.data() as any) || {}
      const dislikes: string[] = data.dislikesBy ?? []
      // Toggle off if already disliked, else add dislike and remove like
      if (dislikes.includes(uid)) {
        transaction.update(ref, { dislikesBy: arrayRemove(uid) })
      } else {
        transaction.update(ref, { dislikesBy: arrayUnion(uid), likesBy: arrayRemove(uid) })
      }
    })
    return true
  })
}
