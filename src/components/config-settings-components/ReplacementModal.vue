<script setup>
import { ref, watch } from 'vue';
import closeIcon from '@/assets/modal/close.svg';
import arrowIcon from '@/assets/modal/arrow.svg';
import trashIcon from '@/assets/modal/trash.svg';

// Mock vue-i18n
const t = (key) => {
  const translations = {
    'settings.texts.letter-replacement.modal.title': 'Редагувати заміни',
    'common.button.add': 'Додати',
    'common.button.save': 'Зберегти',
  };
  return translations[key] || key;
};

const props = defineProps({
  replacements: Array, // [{ from: string, to: string }]
});

const emit = defineEmits(['save', 'close']);

const localReplacements = ref([]);

const handleAdd = () => {
  if (localReplacements.value.length < 6) {
    localReplacements.value.push({ from: '', to: '' });
  }
};

const handleDelete = (index) => {
  localReplacements.value.splice(index, 1);
};

const handleChange = (index, field, value) => {
  if (/^[a-zA-Zа-яА-ЯёЁіїєґІЇЄҐ]?$/.test(value)) {
    localReplacements.value[index][field] = value;
  }
};

watch(
    () => props.replacements,
    (newReplacements) => {
      localReplacements.value = newReplacements.length > 0 ? [...newReplacements] : [{ from: '', to: '' }];
    },
    { immediate: true }
);
</script>

<template>
  <div class="modal-wrapper">
    <div class="modal">
      <div class="header">
        <span class="title">{{ t('settings.texts.letter-replacement.modal.title') }}</span>
        <div class="close" @click="emit('close')">
          <img :src="closeIcon" alt="Close icon" />
        </div>
      </div>
      <div class="divider" />
      <div class="body">
        <div v-for="(replacement, index) in localReplacements" :key="index" class="row">
          <div class="index">{{ index + 1 }}</div>
          <input
              type="text"
              :value="replacement.from"
              maxlength="1"
              @input="handleChange(index, 'from', $event.target.value)"
          />
          <img class="arrow" :src="arrowIcon" alt="Arrow icon" />
          <input
              type="text"
              :value="replacement.to"
              maxlength="1"
              @input="handleChange(index, 'to', $event.target.value)"
          />
          <div class="close" @click="handleDelete(index)">
            <img :src="trashIcon" alt="Trash icon" />
          </div>
        </div>
      </div>
      <div class="footer">
        <button :disabled="localReplacements.length >= 6" @click="handleAdd">
          {{ t('common.button.add') }}
        </button>
        <button @click="emit('save', localReplacements)">
          {{ t('common.button.save') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    width: 22.75rem;
    height: fit-content;
    background-color: #ffffff;
    box-sizing: border-box;
    border-radius: 48px;
    position: relative;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2rem 2rem 0;

      .title {
        color: #30303d;
        font-size: 22px;
        font-weight: 500;
      }

      .close {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #454a53;
        height: 44px;
        width: 44px;
        cursor: pointer;
        box-sizing: border-box;
        border-radius: 14px;
        padding: 8px;
      }
    }

    .divider {
      height: 6px;
      background-color: #0066ff;
      opacity: 0.1;
      margin: 1rem 0;
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 0 2rem;

      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 44px;

        .index {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 14px;
          font-weight: 600;
          font-size: 20px;
          height: 44px;
          width: 44px;
          background-color: #0066ff;
          color: #ffffff;
        }

        input {
          width: 60px;
          height: 44px;
          border: 1px solid #d8d8d8;
          border-radius: 12px;
          box-sizing: border-box;
          font-size: 16px;
          padding: 0 1rem;
          text-align: center;
        }

        .arrow {
          height: 24px;
          width: 24px;
        }

        .close {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 14px;
          cursor: pointer;
          height: 44px;
          width: 44px;
          background-color: #ff7b7b;
        }
      }
    }

    .footer {
      display: flex;
      gap: 1.25rem;
      padding: 2rem;

      button {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        font-size: 16px;
        background: #0066ff;
        color: #fff;

        &:disabled {
          background: #bfd7f6;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>