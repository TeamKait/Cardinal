import { db } from '@/ts/firebase/firebase.ts'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { AccountData, type PeriodType, type SpendingMode } from '@/ts/firebase/AccountData/AccountData.ts'
import type { Spending } from '@/ts/AccountData/SpendingCategoriesData.ts'

function accountRef(uid: string) {
  return doc(db, 'users', uid)
}

function toPlainSpending(sp: Spending) {
  const dateRaw: any = sp?.date
  const dateVal = dateRaw instanceof Date ? dateRaw : (dateRaw ? new Date(dateRaw) : new Date())
  const safeDate = (dateVal instanceof Date && !isNaN(dateVal.getTime())) ? dateVal : new Date()

  const out: any = {
    amount: typeof sp.amount === 'number' ? sp.amount : 0,
    // Firestore accepts JS Date and stores as Timestamp
    date: safeDate,
  }
  if (sp.category) {
    out.category = {
      name: sp.category.name,
      color: sp.category.color,
      icon: sp.category.icon,
    }
  }
  return out
}

export function serializeAccountData(data: AccountData) {
  return {
    budget: typeof data.budget === 'number' ? data.budget : 0,
    spendings: Array.isArray(data.spendings) ? data.spendings.map(toPlainSpending) : [],
    colorTheme: data.colorTheme ?? 'auto',
    periodType: (data.periodType ?? 'day') as PeriodType,
    spendingMode: (data.spendingMode ?? 'period') as SpendingMode,
  }
}

export function mapAccountData(raw: any): AccountData {
  if (!raw) return new AccountData()

  const spendings: Spending[] = Array.isArray(raw.spendings)
    ? raw.spendings.map((s: any) => ({
        amount: typeof s?.amount === 'number' ? s.amount : 0,
        date: typeof s?.date?.toDate === 'function' ? s.date.toDate() : new Date(s?.date ?? Date.now()),
        category: s?.category ? {
          name: s.category.name ?? 'Без категории',
          color: s.category.color ?? '#4a4a4a',
          icon: s.category.icon ?? 'radix-icons:slash',
        } : { name: 'Без категории', color: '#4a4a4a', icon: 'radix-icons:slash' }
      }))
    : []

  return new AccountData(
    typeof raw.budget === 'number' ? raw.budget : 0,
    spendings,
    raw.colorTheme ?? 'auto',
    (raw.periodType ?? 'day') as PeriodType,
    (raw.spendingMode ?? 'period') as SpendingMode,
  )
}

export async function getAccountData(uid: string): Promise<AccountData> {
  const ref = accountRef(uid)
  const snap = await getDoc(ref)
  const data: any = snap.exists() ? snap.data()?.accountData : null
  return mapAccountData(data)
}

export async function saveAccountData(uid: string, data: AccountData): Promise<void> {
  const ref = accountRef(uid)
  await setDoc(ref, { accountData: serializeAccountData(data) }, { merge: true })
}
