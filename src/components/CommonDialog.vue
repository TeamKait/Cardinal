<script setup lang="ts">
import {useCommonDialog} from "@/stores/CommonDialog.ts";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {computed, markRaw} from "vue";

const dialog = useCommonDialog();
const valid = computed(() => !dialog.conditions.some(c => c === false))

function handleOpenChange(value: boolean) {
  dialog.open = value;
}
</script>

<template>
<Dialog :open="dialog.open" @update:open="handleOpenChange">
  <DialogContent class="w-auto max-w-none sm:max-w-none min-w-70">
    <DialogHeader>
      <DialogTitle>{{ dialog.config.label }}</DialogTitle>
    </DialogHeader>

    <component v-for="(c, i) in dialog.components"
               :is="markRaw(c.component)"
               v-bind="c.props"
               v-model="dialog.results[i]"
               v-model:condition="dialog.conditions[i]"
               :key="i"/>

    <div class="flex items-center justify-end w-full pt-5 gap-2 border-t">
      <Button @click="dialog.Cancel" variant="outline">{{ dialog.config.buttons.cancel }}</Button>
      <Button :disabled="!valid" @click="dialog.Confirm">{{ dialog.config.buttons.confirm }}</Button>
    </div>
  </DialogContent>
</Dialog>
</template>