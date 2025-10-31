<script setup lang="ts">
import Header from "@/components/header/Header.vue";
import CommonDialog from "@/components/CommonDialog.vue";
import {Toaster} from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import Footer from "@/components/footer/Footer.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header/>
    <div class="flex-1 flex-center mt-5">
      <RouterView/>
    </div>
    <Footer class="mt-5 mb-0"/>
  </div>

  <!-- диалог на весь экран -->
  <CommonDialog/>

  <!-- уведомления -->
  <Toaster theme="system" :close-button="true" :rich-colors="true" :toast-options="{
    class: '!text-xl flex items-center'
  }"/>
</template>