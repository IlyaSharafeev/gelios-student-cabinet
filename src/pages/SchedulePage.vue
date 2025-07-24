<script setup lang="ts">
import { ref, onMounted } from 'vue';

const iframeUrl = ref('https://gelios-calendar-lib.netlify.app/');

onMounted(() => {
  const iframeElement = document.querySelector('iframe'); // Get the iframe element

  if (iframeElement) {
    iframeElement.onload = () => { // Ensure the iframe content is loaded before sending messages
      console.log('Iframe loaded. Sending messages...');
      if (iframeElement.contentWindow) {
        // --- 1. Send the correct API Base URL ---
        const correctBaseURL = 'https://test-crm.gelios-school.com/server/api';
        // Добавьте correctRefreshTokenURL, если он отличается от correctBaseURL
        const correctRefreshTokenURL = 'https://gelios-teacher.ddns.net/api'; // Пример: тот же URL
        iframeElement.contentWindow.postMessage({
          type: 'SET_API_BASE_URL',
          baseURL: correctBaseURL,
          refreshTokenURL: correctRefreshTokenURL // Отправляем также URL для рефреша
        }, 'https://gelios-calendar-lib.netlify.app'); // Specify the exact origin of your iframe

        // --- 2. Send Authentication Tokens ---
        // IMPORTANT: Replace these with your actual tokens obtained from the parent app's authentication system.
        // For demonstration, using placeholders. In a real app, these would come from your parent app's auth state.
        const accessToken = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');

        iframeElement.contentWindow.postMessage({
          type: 'SET_AUTH_TOKENS',
          accessToken: accessToken,
          refreshToken: refreshToken
        }, 'https://gelios-calendar-lib.netlify.app'); // Specify the exact origin of your iframe

        console.log('API Base URL and Tokens sent to iframe.');
      } else {
        console.error("Iframe contentWindow is not accessible.");
      }
    };
  } else {
    console.error("Iframe element not found in SchedulePage.");
  }
});
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