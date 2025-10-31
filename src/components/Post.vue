<script setup lang="ts">
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import SafeIcon from "@/components/customUI/SafeIcon.vue";


</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center gap-3">
        <Avatar class="size-15">
          <AvatarFallback>
            <SafeIcon icon="radix-icons:person" class="size-7"/>
          </AvatarFallback>
        </Avatar>

        <h1 class="text-2xl">Name</h1>
      </div>
    </CardHeader>

    <CardContent class="w-150">
      <h1 class="text-5xl">label</h1>
      <p class="text-2xl">Content ContentContent ContentContent ContentConte ntContentContentContent</p>
    </CardContent>
  </Card>
</template>