import {toast} from 'vue-sonner'
import {type Component, toRaw} from "vue";

export function ToastComponent(component:Component){
    toast(toRaw(component));
}