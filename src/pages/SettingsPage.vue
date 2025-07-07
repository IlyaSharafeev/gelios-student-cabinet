<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const { t } = useI18n();

const activeTab = ref('general');
const authStore = useAuthStore();
const router = useRouter();

import GeneralForm from '@/components/settings/general/GeneralForm.vue';
import PasswordForm from '@/components/settings/password/PasswordForm.vue';

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
            :class="{ active: activeTab === 'general' }"
            @click="setActiveTab('general')"
        >
          {{ t('general') }}
        </button>
        <button
            :class="{ active: activeTab === 'password' }"
            @click="setActiveTab('password')"
        >
          {{ t('password') }}
        </button>
      </div>

      <div class="logout-button" @click="handleLogout">
        <div class="logout-icon"></div>
        <div>{{ t('logout') }}</div>
      </div>
    </div>

    <div class="content">
      <GeneralForm v-if="activeTab === 'general'" />
      <PasswordForm v-if="activeTab === 'password'" />
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

  .tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    width: fit-content;
    background-color: #FFFFFF;
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
</style>