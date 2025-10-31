<script setup lang="ts">
import CircleButton from "@/components/customUI/buttons/CircleButton.vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {DialogComponent, useCommonDialog} from "@/stores/CommonDialog.ts";
import NewPost from "@/components/dialogs/NewPost.vue";
import Post from "@/components/Post.vue";

const dialog = useCommonDialog();
function Test(){
  dialog.DialogResults("Новый пост", new DialogComponent(NewPost))
}
</script>

<template>
  <CircleButton @click="Test" variant="default" class="size-20 absolute right-5 bottom-45">
    <SafeIcon icon="radix-icons:plus" class="size-10"/>
  </CircleButton>

  <Post/>
</template>