// @/utils/directives/ClickOutside.directive.ts
import type { DirectiveBinding } from 'vue'

interface ClickOutsideElement extends HTMLElement {
    clickOutsideEvent?: (event: Event) => void
}

export const ClickOutside = {
    mounted(el: ClickOutsideElement, binding: DirectiveBinding) {
        el.clickOutsideEvent = function(event: Event) {
            if (!(el === event.target || el.contains(event.target as Node))) {
                binding.value(event)
            }
        }
        document.addEventListener('click', el.clickOutsideEvent)
    },

    unmounted(el: ClickOutsideElement) {
        if (el.clickOutsideEvent) {
            document.removeEventListener('click', el.clickOutsideEvent)
            delete el.clickOutsideEvent
        }
    }
}