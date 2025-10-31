import {toast} from "vue-sonner";

export function CopyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(r => toast.success("Скопировано"));
}

export function Clamp(value: number, min: number | undefined, max: number | undefined) {
    if (min === undefined && max === undefined) return value;
    if (min === undefined) return Math.min(value, max!)
    if (max === undefined) return Math.max(value, min!)
    return Math.min(Math.max(value, min), max)
}

export function NotImplemented(){
    toast.warning("NOT IMPLEMENTED")
    console.error("NOT IMPLEMENTED")
}