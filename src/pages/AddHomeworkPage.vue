<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import HomeworkForm from '@/components/homework/AddHomeWorkForm.vue';
import CertificateForm from '@/components/sertificate/AddSertificateForm.vue';
import ConfirmDialog from '@/components/dialog/ConfirmDialog.vue';

const { t } = useI18n();

const activeTab = ref('homework');
const hasUnsavedHomeworkChanges = ref(false);
const hasUnsavedCertificateChanges = ref(false);
const showDialog = ref(false);
const targetTab = ref<string | null>(null);

const setActiveTab = (tab: string) => {
  if (activeTab.value === tab) return;

  const hasUnsavedChanges = activeTab.value === 'homework' ? hasUnsavedHomeworkChanges.value : hasUnsavedCertificateChanges.value;

  if (hasUnsavedChanges) {
    targetTab.value = tab;
    showDialog.value = true;
  } else {
    activeTab.value = tab;
  }
};

const confirmTabSwitch = () => {
  if (targetTab.value) {
    activeTab.value = targetTab.value;
    targetTab.value = null;
  }
  showDialog.value = false;
};

const cancelTabSwitch = () => {
  targetTab.value = null;
  showDialog.value = false;
};

// Update unsaved changes state from child components
const updateHomeworkUnsavedChanges = (value: boolean) => {
  hasUnsavedHomeworkChanges.value = value;
};

const updateCertificateUnsavedChanges = (value: boolean) => {
  hasUnsavedCertificateChanges.value = value;
};
</script>

<template>
  <div class="add-homework-page">
    <div class="tabs">
      <button
          :class="{ active: activeTab === 'homework' }"
          @click="setActiveTab('homework')"
      >
        {{ t('add_homework.tabs.homework') }}
      </button>
      <button
          :class="{ active: activeTab === 'certificate' }"
          @click="setActiveTab('certificate')"
      >
        {{ t('add_homework.tabs.certificate') }}
      </button>
    </div>

    <div class="content">
      <HomeworkForm v-if="activeTab === 'homework'" @has-unsaved-changes="updateHomeworkUnsavedChanges" />
      <CertificateForm v-if="activeTab === 'certificate'" @has-unsaved-changes="updateCertificateUnsavedChanges" />
    </div>

    <ConfirmDialog
        :is-open="showDialog"
        :title="t('add_homework.dialog.title')"
        :description="t('add_homework.dialog.description')"
        @confirm="confirmTabSwitch"
        @cancel="cancelTabSwitch"
    />
  </div>
</template>

<style scoped>
.add-homework-page {
  padding-top: 0;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  width: fit-content;
  background-color: #FFFFFF;
  border-radius: 16px;
}

button {
  padding: 12px 26px;
  border: none;
  background: #FFFFFF;
  cursor: pointer;
  border-radius: 16px;
  font-family: "Onest", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
}

button.active {
  background: #0066FF;
  border-radius: 16px;
  padding: 12px 26px;
  font-family: "Onest", sans-serif;
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