<script setup lang="ts">
import { ref } from 'vue';

const iframeUrl = ref('https://gelios-calendar-lib.netlify.app/');
</script>

<template>
  <div>
    <div class="iframe-wrapper">
      <iframe :src="iframeUrl" frameborder="0"></iframe>
    </div>
  </div>
</template>

<style scoped>
.iframe-wrapper {
  /* Задаем контейнеру высоту, например, на весь экран */
  width: 100%;
  height: calc(100vh - 10vh); /* 100% высоты видимой части окна */
}

.iframe-wrapper iframe {
  /* Iframe растягивается на всю высоту и ширину родителя */
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 25px;
}
</style>