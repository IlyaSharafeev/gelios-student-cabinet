<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';
import ClassesPage from "@/pages/ClassesPage.vue";
import HomeWorksPage from "@/pages/HomeWorksPage.vue";
import MaterialsPage from "@/pages/MaterialsPage.vue";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const activeTab = ref(route.query.tab || 'homeworks');

watch(() => route.query.tab, (newTab) => {
  if (newTab) {
    activeTab.value = newTab as string;
  }
});

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
  router.push({ query: { tab } });
};
</script>

<template>
  <div class="settings-page">
    <div class="tabs-wrapper">
      <div class="tabs">
<!--        <button-->
<!--            :class="{ active: activeTab === 'classes' }"-->
<!--            @click="setActiveTab('classes')"-->
<!--        >-->
<!--          {{ t('tabs.classes') }}-->
<!--        </button>-->
        <button
            :class="{ active: activeTab === 'homeworks' }"
            @click="setActiveTab('homeworks')"
        >
          {{ t('tabs.homeworks') }}
        </button>
        <button
            :class="{ active: activeTab === 'materials' }"
            @click="setActiveTab('materials')"
        >
          {{ t('tabs.materials') }}
        </button>
      </div>
    </div>

    <div class="content" :class="{ 'no-background': activeTab === 'homeworks' }">
<!--      <ClassesPage v-if="activeTab === 'classes'" />-->
      <HomeWorksPage v-if="activeTab === 'homeworks'" />
      <MaterialsPage v-if="activeTab === 'materials'" />
    </div>
  </div>
</template>

<style scoped>
/* Your existing styles */
.settings-page {
  padding-top: 0;
}

.tabs-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    width: fit-content;
    background-color: #FFFFFF; /* Default background */
    border-radius: 16px;
  }

  .logout-button {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    padding: 12px 26px;
    background-color: #FF7B7B;
    color: #FFFFFF;
    border-radius: 16px;
    font-size: 16px;
    cursor: pointer;

    .logout-icon {
      background-image: url('@/assets/images/icons/log-out.svg');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      width: 24px;
      height: 24px;
    }
  }
}

button {
  padding: 12px 26px;
  border: none;
  background: #FFFFFF;
  cursor: pointer;
  border-radius: 16px;
  font-size: 16px;
  font-family: 'Onest' sans-serif;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0%;
}

button.active {
  background: #0066FF;
  border-radius: 16px;
  padding: 12px 26px;
  font-family: 'Onest' sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  color: white;
}

button.active:hover {
  background: #0056b3;
}

.content {
  padding: 42px;
  background-color: #FFFFFF;
  border-radius: 32px;
}

.content.no-background {
  background-color: transparent;
  padding: 0;
}
</style>