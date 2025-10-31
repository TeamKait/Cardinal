<script setup lang="ts">
import Author from "@/views/AboutView/Author.vue";
import {ref} from "vue";
import Paragraph from "@/views/AboutView/Paragraph.vue";
import NumberedList from "@/components/customUI/NumberedList.vue";

const selected = ref([false, false, false])
</script>

<template>
  <div class="flex flex-col items-start gap-10 mt-20">
    <div class="flex-center flex-col">
      <h1 class="text-[100px] font-bold select-none text-primary">
        CARDINAL
      </h1>
      <div class="flex gap-20">
        <Author
            v-model="selected[0]"
            name="Артём Лющенко"
            :highlighted-indices="[0, 1]"
            description="Разработка сайта"
            :highlighted="true"/>
        <Author
            v-model="selected[1]"
            name="Валерий Сергеев"
            :highlighted-indices="[0, 1]"
            description="DevOps, помощь"
            :highlighted="true"/>
        <Author
            v-model="selected[2]"
            name="Виктор Буянкин"
            :highlighted-indices="[0, 1, 5]"
            description="Работа с документами, оформление"
            :highlighted="true"/>
      </div>
    </div>

    <Paragraph label="О проекте">
      CARDINAL - соцсеть, чтобы делиться мыслями, творчеством, обмениваться мнениями и заводить новых друзей
    </Paragraph>
    <Paragraph label="Наша цель">
      Создать соцсеть для микроблоггинга с возможностью писать посты, оценивать их и писать к ним комментариями
    </Paragraph>
    <Paragraph label="Стек">
      <NumberedList
          :items="['Vue.js', 'TailwindCSS', 'Pinia', 'TypeScript', 'Shadcn-Vue', 'Iconify', 'Chart.js', 'Firestore']"/>
    </Paragraph>
  </div>
</template>