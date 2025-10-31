import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ClickOutside } from './ts/ClickOutside.directive.ts'

import App from './App.vue'
import router from './router.ts'
import './ts/firebase/firebase.ts'
import {initAuthSync} from "@/ts/firebase/users/user.controller.ts";

const app = createApp(App)

app.directive('click-outside', ClickOutside)

app.use(createPinia())
app.use(router)

app.mount('#app')

initAuthSync()