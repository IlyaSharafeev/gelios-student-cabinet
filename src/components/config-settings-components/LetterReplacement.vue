<script setup>
import { ref } from 'vue';
import arrowIcon from '@/assets/modal/arrow.svg';
import ReplacementModal from './ReplacementModal.vue';

// Mock vue-i18n
const t = (key) => {
  const translations = {
    'settings.texts.letter-replacement.no-content': 'Немає замін',
    'common.button.edit': 'Редагувати',
  };
  return translations[key] || key;
};

const props = defineProps({
  replacements: Array, // [{ from: string, to: string }]
});

const emit = defineEmits(['update:replacements']);

const showModal = ref(false);

const handleSave = (newReplacements) => {
  emit('update:replacements', newReplacements.filter((r) => r.from && r.to));
  showModal.value = false;
};
</script>

<template>
  <div class="letter-replacement">
    <div v-if="replacements.length > 0" class="replacements">
      <div v-for="(r, i) in replacements" :key="i" class="item">
        <span>{{ r.from }}</span>
        <img :src="arrowIcon" alt="Arrow icon" />
        <span>{{ r.to }}</span>
      </div>
    </div>
    <span v-else>{{ t('settings.texts.letter-replacement.no-content') }}</span>
    <button @click="showModal = true">{{ t('common.button.edit') }}</button>
    <ReplacementModal
        v-if="showModal"
        :replacements="replacements"
        @save="handleSave"
        @close="showModal = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.letter-replacement {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1.25rem;

  .replacements {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    color: #30303d;
    font-weight: 500;

    img {
      height: 20px;
      margin: 0 8px;
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: #0066ff;
    color: #fff;
    font-size: 16px;
  }
}
</style>