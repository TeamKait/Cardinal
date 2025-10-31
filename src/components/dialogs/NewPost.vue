<script setup lang="ts">

import WithLabel from "@/components/customUI/WithLabel.vue";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
</script>

<template>
  <WithLabel label="Заголовок поста" position="top">
    <Input placeholder="Заголовок"/>
  </WithLabel>

  <WithLabel label="Содержание" position="top">
    <Textarea placeholder="Напишите что-нибудь" class="resize-none w-100"/>
  </WithLabel>
</template>