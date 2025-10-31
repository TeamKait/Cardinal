import {defineStore} from 'pinia'
import {ref, watch} from "vue";
import {AccountData} from "@/ts/firebase/AccountData/AccountData.ts";
import {DialogComponent, useCommonDialog} from "@/stores/CommonDialog.ts";
import {auth} from "@/ts/firebase/firebase.ts";
import {saveAccountData} from "@/ts/firebase/AccountData/AcountData.controller.ts";

export const useAccountData = defineStore('account data', () => {
    const dialog = useCommonDialog();
    const data = ref<AccountData>(new AccountData())

    // sync control
    let suppressSave = false
    let saveTimer: any = null

    function SetFromRemote(newData: AccountData) {
        suppressSave = true
        data.value = newData
        // small next-tick delay before allowing saves again
        setTimeout(() => {
            suppressSave = false
        }, 0)
    }

    function Reset() {
        suppressSave = true
        data.value = new AccountData()
        setTimeout(() => {
            suppressSave = false
        }, 0)
    }

    // watch changes and sync to firestore (debounced)
    watch(data, async (val) => {
        if (suppressSave) return
        const user = auth.currentUser
        if (!user) return
        if (saveTimer) clearTimeout(saveTimer)
        saveTimer = setTimeout(async () => {
            try {
                await saveAccountData(user.uid, val)
            } catch (e) {
                console.error('Failed to save account data', e)
            }
        }, 400)
    }, {deep: true})


    return {data, SetFromRemote, Reset}
})
