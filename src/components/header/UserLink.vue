<script setup lang="ts">
import {ref} from 'vue'
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {getAuth, onAuthStateChanged, type User} from "firebase/auth"
import IconButton from "@/components/customUI/buttons/IconButton.vue";
import {logOut} from "@/ts/firebase/users/user.controller.ts";
import DropdownFunctions from "@/components/customUI/DropdownFunctions/DropdownFunctions.vue";
import {DropdownFunction} from "@/components/customUI/DropdownFunctions/DropdownFunction.ts";
import {toast} from "vue-sonner";
import {useCommonDialog} from "@/stores/CommonDialog.ts";
import SafeIcon from "@/components/customUI/SafeIcon.vue";

const auth = getAuth()
const dialog = useCommonDialog();
const user = ref<User | null>(null)
const loading = ref(true)

onAuthStateChanged(auth, (u) => {
  user.value = u
  loading.value = false
})

async function handleLogOut() {
  const result = await dialog.BoolDialogResults('Подтверждение', 'Вы точно хотите выйти из аккаунта?')
  if(!result) return;

  await logOut()
}
</script>


<template>
  <RouterLink to="/login" class="flex items-center px-10 gap-3 hover:underline border-l h-full">
    <Avatar class="size-15">
      <AvatarFallback class="text-3xl">
        <SafeIcon icon="radix-icons:person"/>
      </AvatarFallback>
    </Avatar>
    <!-- TODO: burger menu for log out etc -->
    <p class="text-2xl">{{ user?.email?.split('@')[0] ?? 'Войти' }}</p>

    <DropdownFunctions v-if="auth.currentUser"
                       :functions="[new DropdownFunction('Настройки', 'radix-icons:gear', () => toast.warning('NOT IMPLEMENTED')),
                                    new DropdownFunction('Выйти', 'radix-icons:exit', handleLogOut)]">
      <IconButton
          icon="radix-icons:dots-vertical"
          size="icon"
          variant="outline"
          class="flex-center rounded-full"/>
    </DropdownFunctions>
  </RouterLink>
</template>