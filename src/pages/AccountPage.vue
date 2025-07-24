<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const { t } = useI18n();

// Set default active tab to 'progress' to match the initial view in the image
const activeTab = ref('progress');
const authStore = useAuthStore();
const router = useRouter();

import ProgressForm from "@/components/account/ProgressForm.vue";
import CertificateForm from "@/components/account/CertificateForm.vue";

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <div class="settings-page">
    <div class="tabs-wrapper">
      <div class="tabs">
        <button
            :class="{ active: activeTab === 'progress' }"
            @click="setActiveTab('progress')"
        >
          {{ t('progress') }}
        </button>
        <button
            :class="{ active: activeTab === 'certificate' }"
            @click="setActiveTab('certificate')"
        >
          {{ t('certificate') }}
        </button>
      </div>
    </div>

    <div class="content">
      <ProgressForm v-if="activeTab === 'progress'" />
      <CertificateForm v-if="activeTab === 'certificate'" />
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  padding-top: 0;
}

.tabs-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px; /* Added margin for spacing */

  .tabs {
    display: flex;
    gap: 10px;
    width: fit-content;
    background-color: #FFFFFF;
    border-radius: 16px;
    padding: 8px; /* Added padding for tab buttons */
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
  }
}

button {
  padding: 12px 26px;
  border: none;
  background: #FFFFFF;
  cursor: pointer;
  border-radius: 16px;
  font-size: 16px;
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0%;
  transition: all 0.3s ease; /* Added transition for hover effect */
}

button.active {
  background: #0066FF;
  border-radius: 16px;
  padding: 12px 26px;
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  color: white;
}

button:hover:not(.active) { /* Added hover effect for inactive buttons */
  background: #f0f0f0;
}

button.active:hover {
  background: #0056b3;
}

.content {
  padding-top: 10px;
  border-radius: 32px;
}

/* Placeholder for log-out icon as the SVG is not provided */
.logout-icon {
  width: 24px;
  height: 24px;
  background-color: white; /* Placeholder color */
  mask: url('@/assets/images/icons/log-out.svg') no-repeat center / contain; /* Use mask for SVG */
  -webkit-mask: url('@/assets/images/icons/log-out.svg') no-repeat center / contain;
}
</style>