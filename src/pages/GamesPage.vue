<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHomeworksStore } from '@/stores/homeworks';

// ... імпорти картинок ...
import trainer1 from '@/assets/backgrounds/trainers/1.png';
import trainer2 from '@/assets/backgrounds/trainers/2.png';
import trainer3 from '@/assets/backgrounds/trainers/3.png';
import trainer4 from '@/assets/backgrounds/trainers/4.png';
import trainer5 from '@/assets/backgrounds/trainers/5.png';
import trainer6 from '@/assets/backgrounds/trainers/6.png';
import trainer7 from '@/assets/backgrounds/trainers/7.png';
import trainer8 from '@/assets/backgrounds/trainers/8.png';
import trainer9 from '@/assets/backgrounds/trainers/9.png';
import trainer10 from '@/assets/backgrounds/trainers/10.png';
import trainer11 from '@/assets/backgrounds/trainers/11.png';
import trainer12 from '@/assets/backgrounds/trainers/12.png';
import trainer13 from '@/assets/backgrounds/trainers/13.png';
import trainer14 from '@/assets/backgrounds/trainers/14.png';
import trainer15 from '@/assets/backgrounds/trainers/15.png';
import trainer16 from '@/assets/backgrounds/trainers/16.png';

interface Trainer {
  id: number;
  name: string;
  slug: string;
  image: string;
  iframeUrl: string;
  backgroundColor?: string;
}

const slugify = (text: string): string => {
  const ua = { 'а':'a','б':'b','в':'v','г':'h','ґ':'g','д':'d','е':'e','є':'ie','ж':'zh','з':'z','и':'y','і':'i','ї':'i','й':'i','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ь':'','ю':'iu','я':'ia' };
  return text.toLowerCase().trim()
      .replace(/[а-яґєїі]/g, (match) => ua[match as keyof typeof ua])
      .replace(/ & /g, '-and-')
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
};

const trainers: Trainer[] = [
  { id: 1, name: 'Знайди пару', slug: slugify('Знайди пару'), image: trainer1, iframeUrl: import.meta.env.VITE_MEMO, backgroundColor: '#0066FF' },
  { id: 2, name: 'Тест швидкості читання', slug: slugify('Тест швидкості читання'), image: trainer2, iframeUrl: import.meta.env.VITE_READING_SPEED_TEST, backgroundColor: '#FF7B7B' },
  { id: 3, name: 'Таблиця Шульте', slug: slugify('Таблиця Шульте'), image: trainer3, iframeUrl: import.meta.env.VITE_SCHULTE_TABLE_URL, backgroundColor: '#FF7A00' },
  { id: 4, name: 'Spritz', slug: slugify('Spritz'), image: trainer4, iframeUrl: import.meta.env.VITE_SPRITZ_URL, backgroundColor: '#FFDF39' },
  { id: 5, name: 'Ментальна арифметика', slug: slugify('Ментальна арифметика'), image: trainer5, iframeUrl: import.meta.env.VITE_SPEED_MATH_URL, backgroundColor: '#0066FF' },
  { id: 6, name: 'Філворди', slug: slugify('Філворди'), image: trainer6, iframeUrl: import.meta.env.VITE_FILLWORDS_URL, backgroundColor: '#F47BFF' },
  { id: 7, name: 'Тест Струпа', slug: slugify('Тест Струпа'), image: trainer7, iframeUrl: import.meta.env.VITE_STROOP_TEST_URL, backgroundColor: '#0066FF' },
  { id: 8, name: 'Алфавіт', slug: slugify('Алфавіт'), image: trainer8, iframeUrl: import.meta.env.VITE_ALPHABET_URL, backgroundColor: '#FFDF39' },
  { id: 9, name: 'Знайди слово', slug: slugify('Знайди слово'), image: trainer9, iframeUrl: import.meta.env.VITE_FIND_THE_WORD_URL, backgroundColor: '#42D60E' },
  { id: 10, name: 'Тексти', slug: slugify('Тексти'), image: trainer10, iframeUrl: import.meta.env.VITE_TEXTS_URL, backgroundColor: '#FF7B7B' },
  { id: 11, name: 'Кіберкішка', slug: slugify('Кіберкішка'), image: trainer11, iframeUrl: import.meta.env.VITE_DINO_URL, backgroundColor: '#FF7A00' },
  { id: 12, name: 'Флеш карти', slug: slugify('Флеш карти'), image: trainer12, iframeUrl: import.meta.env.VITE_FLASH_CARDS_URL, backgroundColor: '#0066FF' },
  { id: 13, name: 'Абакус', slug: slugify('Абакус'), image: trainer13, iframeUrl: import.meta.env.VITE_ABACUS_URL, backgroundColor: '#FFDF39' },
  { id: 14, name: 'Знайди кіберкішку', slug: slugify('Знайди кіберкішку'), image: trainer14, iframeUrl: import.meta.env.VITE_FIND_THE_CYBER_CAT_URL, backgroundColor: '#42D60E' },
  { id: 15, name: 'Мнемотехніка', slug: slugify('Мнемотехніка'), image: trainer15, iframeUrl: import.meta.env.VITE_MNEMONICS_URL, backgroundColor: '#0066FF' },
  { id: 16, name: 'Множення & Ділення', slug: slugify('Множення & Ділення'), image: trainer16, iframeUrl: import.meta.env.VITE_MULTIPLICATION_AND_DIVISION, backgroundColor: '#F47BFF' },
];

const isLoadingIframe = ref(false);
const route = useRoute();
const router = useRouter();
const homeworksStore = useHomeworksStore();

const selectedTrainer = computed(() => {
  const slug = route.params.trainerSlug;
  if (!slug) return null;
  return trainers.find(t => t.slug === slug) || null;
});

const configuredIframeUrl = computed(() => {
  if (!selectedTrainer.value) return '';
  const homeworkConfigStr = route.query.config as string;
  if (homeworkConfigStr) {
    const baseUrl = selectedTrainer.value.iframeUrl.split('?')[0];
    const encodedConfig = encodeURIComponent(homeworkConfigStr);
    return `${baseUrl}?config=${encodedConfig}`;
  }
  return selectedTrainer.value.iframeUrl;
});

const selectTrainer = (trainer: Trainer) => {
  router.push({ name: 'game-view', params: { trainerSlug: trainer.slug } });
};

const goBackToGrid = () => {
  router.push({ name: 'games-grid' });
};

const handleIframeLoad = () => {
  isLoadingIframe.value = false;
};

// ✅ ОНОВЛЕНО: Виправлена логіка перевірки
const handleGameEvent = async (event: MessageEvent) => {
  const data = event.data;

  // Крок 1: Відфільтровуємо події, залишаючи тільки потрібну
  if (typeof data !== 'object' || data === null || data.type !== 'gamePlayed' || !data.payload) {
    return;
  }

  // Крок 2: Перевіряємо умову перемоги всередині 'payload'
  if (data.payload.isWin === true) {
    const activeId = homeworksStore.getActiveHomeworkId;

    // Крок 3: Перевіряємо, чи є активне ДЗ
    if (activeId) {
      console.log(`Homework ${activeId} is done! Sending request...`);
      try {
        await homeworksStore.markHomeworkAsDone(activeId);
        // await router.push('/homework');
      } catch (error) {
        console.error("Error while marking homework as done:", error);
      }
    }
  }
};


watch(
    () => route.params.trainerSlug,
    (newSlug) => {
      if (newSlug) {
        isLoadingIframe.value = true;
      }
    },
    { immediate: true }
);

watch(
    () => route.query.homeworkId,
    (newId) => {
      const homeworkId = newId ? parseInt(newId as string, 10) : null;
      homeworksStore.setActiveHomework(homeworkId);
    },
    {
      immediate: true,
    }
);

onMounted(() => {
  window.addEventListener('message', handleGameEvent);
});

onUnmounted(() => {
  window.removeEventListener('message', handleGameEvent);
});
</script>

<template>
  <div class="games-page">
    <div v-if="selectedTrainer" class="iframe-view">
      <div class="iframe-header">
        <span class="back-arrow" @click="goBackToGrid">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="#0066FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <h1 class="iframe-title">{{ selectedTrainer.name }}</h1>
      </div>
      <div class="iframe-container">
        <div v-if="isLoadingIframe" class="spinner-overlay">
          <div class="spinner"></div>
        </div>
        <iframe
            :src="configuredIframeUrl"
            class="trainer-iframe"
            frameborder="0"
            allowfullscreen
            @load="handleIframeLoad"
            :class="{ 'iframe-hidden': isLoadingIframe }"
        ></iframe>
      </div>
    </div>

    <div v-else>
      <div class="games-grid">
        <div
            v-for="trainer in trainers"
            :key="trainer.id"
            class="game-card"
            :style="{ backgroundColor: trainer.backgroundColor || '#FFFFFF' }"
            @click="selectTrainer(trainer)"
        >
          <img :src="trainer.image" :alt="trainer.name" class="game-image" />
          <span class="game-name">{{ trainer.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/scss/mixins/mixins-media.scss';

.games-page {
  padding-bottom: 50px;
}

.page-title {
  font-weight: 500;
  font-size: 32px;
  color: #333;
  margin-bottom: 24px;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

@include media-max(mobile) {
  .games-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  .game-card {
    min-width: unset;
  }
}

@include media-between(tablet, desktop) {
  .games-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

.game-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 32px;
  padding: 26px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  height: 284px;
  position: relative;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.game-image {
  object-fit: cover;
  margin-bottom: 12px;
}

.game-name {
  font-weight: 500;
  font-size: 16px;
  color: #333;
  position: absolute;
  left: 32px;
  bottom: 36px;
  font-weight: 500;
  font-size: 26px;
  line-height: 105%;
  letter-spacing: 0%;
  color: #FFFFFF;
}

.iframe-view {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px);
}

.iframe-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-arrow {
  cursor: pointer;
  margin-right: 16px;
  display: flex;
  align-items: center;
}

.iframe-title {
  font-weight: 500;
  font-size: 32px;
  color: #333;
}

.iframe-container {
  position: relative;
  flex-grow: 1;
  width: 100%;
  border-radius: 32px;
  overflow: hidden;
  padding: 25px;
  background-color: #eff3f4;
}

.trainer-iframe {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.iframe-hidden {
  visibility: hidden;
}

.spinner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: 8px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>