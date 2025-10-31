<script setup lang="ts">
import WithLabel from "@/components/customUI/WithLabel.vue";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Post} from "@/ts/firebase/PostData/post.model.ts";
import {getAuth} from "firebase/auth";
import {onMounted, ref, watch} from "vue";

const auth = getAuth();
const model = defineModel<Post>()
const condition = defineModel<boolean>('condition');

const label = ref("")
const content = ref("")

function UpdateModel(){
  model.value = new Post(auth.currentUser?.email!, label.value, content.value)
  condition.value = label.value.length > 0 && content.value.length > 0;
}
onMounted(UpdateModel)

watch(() => [label, content], UpdateModel, {deep: true})
</script>

<template>
  <WithLabel label="Заголовок поста" position="top">
    <Input v-model="label" placeholder="Заголовок"/>
  </WithLabel>

  <WithLabel label="Содержание" position="top">
    <Textarea v-model="content" placeholder="Напишите что-нибудь" class="resize-none w-100"/>
  </WithLabel>
</template>