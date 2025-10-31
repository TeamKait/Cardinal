import type { Ref } from "vue";
import {toast} from "vue-sonner";

export async function TryAction(action: Function) {
    try {
        return await action();
    } catch (e) {
        console.error(e)
        toast.error("Ошибка: " + (e as Error).message);
        return null
    }
}

export async function LoadingAction(action: Function, loadingRef:Ref<boolean>) {
    loadingRef.value = true;
    const response = await TryAction(action);
    loadingRef.value = false;
    return response
}