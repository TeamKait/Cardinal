import {db} from '@/ts/firebase/firebase.ts'
import {collection, doc, getDocs, setDoc, serverTimestamp, getDoc} from 'firebase/firestore'
import {User} from '@/ts/firebase/users/user.model.ts'
import {TryAction} from "@/ts/TryAction.ts";
import {createUserWithEmailAndPassword, getAuth, signOut, onAuthStateChanged} from "firebase/auth";
import {toast} from "vue-sonner";

const auth = getAuth();


export async function createUser(email: string, password: string) {
    return await TryAction(async () => {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)

        await setDoc(doc(db, 'users', user.uid), {
            email: email,
            uid: user.uid,
            createdAt: serverTimestamp()
        })

        return { uid: user.uid, email: user.email }
    })
}

export async function getUsers() {
    return await TryAction(async () => {
        const snapshot = await getDocs(collection(db, 'users'))
        const users = snapshot.docs.map(d => {
            const data: any = d.data()
            const createdAt = data?.createdAt
            return {
                login: data?.email ?? 'N/A',
                id: d.id,
                date: typeof createdAt?.toDate === 'function' ? createdAt.toDate() : undefined
            }
        })
        return users as unknown as User[]
    })
}

export async function getUserById(uid: string) {
    return await TryAction(async () => {
        const ref = doc(db, 'users', uid)
        const snap = await getDoc(ref)
        if (!snap.exists()) return null
        const data: any = snap.data()
        const createdAt = data?.createdAt
        return {
            login: data?.email ?? 'N/A',
            id: snap.id,
            date: typeof createdAt?.toDate === 'function' ? createdAt.toDate() : undefined
        } as User
    })
}

export async function removeUser(user: User) {
    // TODO: replace with remove own account. Make it require second auth
}

export async function logOut() {
    await signOut(auth)
    toast.info("Вы вышли из аккаунта")
}

// SYNC FUNCTIONS
async function ensureUserDocExists(uid: string, email?: string) {
    const ref = doc(db, 'users', uid)
    const snap = await getDoc(ref)
    if (!snap.exists()) {
        await setDoc(ref, {
            email: email ?? null,
            uid,
            createdAt: serverTimestamp()
        })
    }
}

export function initAuthSync() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            await TryAction(async () => {
                await ensureUserDocExists(user.uid, user.email ?? undefined)
            })
        }
    })
}