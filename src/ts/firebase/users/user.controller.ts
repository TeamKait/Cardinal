import {db} from '@/ts/firebase/firebase.ts'
import {collection, doc, getDocs, setDoc, serverTimestamp, getDoc} from 'firebase/firestore'
import {User} from '@/ts/firebase/users/user.model.ts'
import {TryAction} from "@/ts/TryAction.ts";
import {createUserWithEmailAndPassword, getAuth, signOut, onAuthStateChanged} from "firebase/auth";
import {toast} from "vue-sonner";
import {AccountData} from "@/ts/firebase/AccountData/AccountData.ts";
import { serializeAccountData } from "@/ts/firebase/AccountData/AcountData.controller.ts";

const auth = getAuth();

function mapAccountData(raw: any): AccountData {
    if (!raw) return new AccountData()
    return new AccountData(
        typeof raw.budget === 'number' ? raw.budget : 0,
        Array.isArray(raw.spendings) ? raw.spendings : [],
        raw.colorTheme ?? 'auto',
        raw.periodType ?? 'day',
        raw.spendingMode ?? 'period'
    )
}

export async function createUser(email: string, password: string) {
    return await TryAction(async () => {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)

        // создаём документ пользователя с AccountData по умолчанию
        await setDoc(doc(db, 'users', user.uid), {
            email: email,
            uid: user.uid,
            createdAt: serverTimestamp(),
            accountData: serializeAccountData(new AccountData())
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
            const rawAccount = data?.accountData
            return {
                login: data?.email ?? 'N/A',
                id: d.id,
                date: typeof createdAt?.toDate === 'function' ? createdAt.toDate() : undefined,
                accountData: mapAccountData(rawAccount)
            }
        })
        return users as unknown as (User & { accountData?: AccountData })[]
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
            date: typeof createdAt?.toDate === 'function' ? createdAt.toDate() : undefined,
            accountData: mapAccountData(data?.accountData)
        } as User & { accountData: AccountData }
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
            createdAt: serverTimestamp(),
            accountData: serializeAccountData(new AccountData())
        })
    } else {
        // если документ есть, но нет accountData — добавим дефолтную (merge)
        const data: any = snap.data()
        if (!data?.accountData) {
            await setDoc(ref, { accountData: serializeAccountData(new AccountData()) }, { merge: true })
        }
    }
}

export function initAuthSync() {
    onAuthStateChanged(auth, async (user) => {
        const { useAccountData } = await import('@/stores/AccountData.store.ts')
        const { getAccountData } = await import('@/ts/firebase/AccountData/AcountData.controller.ts')
        const store = useAccountData()
        if (user) {
            await TryAction(async () => {
                await ensureUserDocExists(user.uid, user.email ?? undefined)
                const ad = await getAccountData(user.uid)
                store.SetFromRemote(ad)
            })
        } else {
            // reset store on logout
            store.Reset()
        }
    })
}