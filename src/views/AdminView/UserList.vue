<script setup lang="ts">
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import IconButton from "@/components/customUI/buttons/IconButton.vue";
import UserComponent from "@/views/AdminView/UserComponent.vue";
import {computed, ref} from "vue";
import type {User} from "@/ts/firebase/users/user.model.ts";
import {LoadingAction} from "@/ts/TryAction.ts";
import {getUsers} from "@/ts/firebase/users/user.controller.ts";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Input} from "@/components/ui/input";
import InputWithIcon from "@/components/customUI/InputWithIcon.vue";

const users = ref<User[]>([]);
const loading = ref(true);


async function Reload() {
  users.value = await LoadingAction(getUsers, loading)
  ToggleAll(false)
}
Reload()

const openId = ref<number[]>([]);

//#region Toggle functions
function isOpen(id: number): boolean {
  return openId.value.includes(id);
}

function Toggle(id: number) {
  if (isOpen(id)) {
    openId.value = openId.value.filter(x => x !== id);
  } else {
    openId.value.push(id);
  }
}


function ToggleAll(overrideOpen: boolean | null = null) {
  if (overrideOpen == null ? openId.value.length > 0 : !overrideOpen) {
    openId.value = []
  } else {
    for (let i = 0; i < users.value.length; i++) {
      openId.value.push(i)
    }
  }
}

//#endregion Toggle functions

const search = ref("");
const filteredUsers = computed(() => {
  return users.value.filter(user =>
      Object.values(user).some(field =>
          field?.toString().toLowerCase().includes(search.value.toLowerCase())
      )
  );
});
</script>

<template>
  <Card class="w-150">
    <CardHeader class="flex justify-between">
      <CardTitle class="text-2xl">Пользователи</CardTitle>
      <div class="flex gap-2">
        <InputWithIcon v-model="search" icon="radix-icons:magnifying-glass" placeholder="Поиск"/>

        <IconButton icon="radix-icons:chevron-up"
                    @click="() => ToggleAll(null)"
                    size="icon"
                    class="flex-center"
                    variant="outline"
                    :icon-class="['transition-all', {'rotate-180':openId.length > 0}]"/>
        <IconButton icon="radix-icons:reload"
                    @click="Reload"
                    size="icon"
                    class="flex-center"
                    variant="outline"/>
      </div>
    </CardHeader>
    <CardContent>
      <ScrollArea class="h-100 p-3">
        <div class="flex-center flex-col gap-5">
          <!-- users -->
          <UserComponent v-if="!loading"
                         v-for="(u, i) in filteredUsers"
                         :user="u"
                         :loaded="true"
                         @toggle="Toggle(i)"
                         :open="isOpen(i)"/>

          <!-- skeletons -->
          <UserComponent v-else
                         v-for="(_, i) in 4"
                         :loaded="false"
                         :user="null"
                         :open="false"/>

          <!-- empty messages -->
          <p v-if="users.length == 0" class="w-full h-full text-center text-muted-foreground">Пользователей нет</p>
          <p v-else-if="filteredUsers.length == 0" class="w-full h-full text-center text-muted-foreground">Ничего не
            найдено</p>
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
</template>