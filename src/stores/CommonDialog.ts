import {ref, type Component, reactive} from 'vue'
import {defineStore} from 'pinia'
import TextDialog from "@/components/dialogs/TextDialog.vue";

export class DialogComponent {
    public component: Component
    public props: object | null

    public constructor(component: Component, props: object | null = null) {
        this.component = component
        this.props = props
    }
}

export const useCommonDialog = defineStore('common dialog', () => {
    const components = ref<Array<DialogComponent>>([])
    const conditions = ref<Array<boolean>>([])
    const results = ref<Array<any>>([])
    const config = reactive({
        label: "NO LABEL PROVIDED",
        buttons: {
            cancel: 'Отмена',
            confirm: 'Подтвердить'
        }
    })
    const open = ref(false);

    let resolver: ((value: any) => void) | null = null;

    async function InnerHandleDialog(dialogLabel:string, cancelText:string, confirmText:string, ...dialogComponents: DialogComponent[]) {
        components.value = dialogComponents;
        results.value = dialogComponents.map(c => c.props?.defaultValue);
        conditions.value = Array(dialogComponents.length);
        config.label = dialogLabel;
        config.buttons = {
            cancel: cancelText,
            confirm: confirmText
        }
        open.value = true;

        let res: unknown;
        await new Promise(resolve => {
            resolver = resolve;
        }).then(r => res = r);
        return res as Array<any>;
    }

    async function DialogResults(dialogLabel: string, ...dialogComponents: DialogComponent[]) {
        return await InnerHandleDialog(dialogLabel, 'Отмена', 'Подтвердить', ...dialogComponents)
    }

    async function BoolDialogResults(dialogLabel: string, text: string, textClass: string = ""): Promise<boolean> {
        const r = await InnerHandleDialog(dialogLabel, 'Нет', 'Да', new DialogComponent(TextDialog, {text: text, class: textClass}))
        return !!r
    }

    function ResolveDialog(value: Array<any> | null) {
        if (resolver) {
            resolver(value);
            resolver = null;
        }
        open.value = false;
    }

    function Confirm() {
        ResolveDialog(results.value);
    }

    function Cancel() {
        ResolveDialog(null);
    }

    return {components, results, conditions, config, open, DialogResults, BoolDialogResults, Confirm, Cancel}
})
