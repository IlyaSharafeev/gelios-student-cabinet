<template>
  <div class="language-select">
    <label class="label" for="language">Мова</label>
    <div
        class="select-wrapper"
        :class="{ 'select-open': isOpen }"
        @click="toggleDropdown"
    >
      <div class="selected-value">
        {{ props.modelValue.label }}
        <svg class="chevron" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
      <ul v-if="isOpen" class="dropdown">
        <li
            v-for="lang in languages"
            :key="lang.value"
            @click.stop="selectLanguage(lang)"
        >
          {{ lang.label }}
          <svg
              v-if="lang.value === selectedLanguage.value"
              class="checkmark"
              viewBox="0 0 24 24"
              width="16"
              height="16"
          >
            <path fill="#4a90e2" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import i18n from '@/locales/vue-i18n'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const languages = [
  { label: 'Українська', value: 'uk' },
  { label: 'English', value: 'en' },
  { label: 'Русский', value: 'ru' },
]

const selectedLanguage = computed({
  get: () => {
    const savedLang = localStorage.getItem('selectedLanguage')
    const lang = savedLang
        ? languages.find(l => l.value === savedLang)
        : props.modelValue
    return lang || languages[0] // Fallback to default language
  },
  set: (value) => {
    emit('update:modelValue', value)
    localStorage.setItem('selectedLanguage', value.value)
    i18n.global.locale.value = value.value // Use reactive locale
  },
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLanguage = (lang) => {
  selectedLanguage.value = lang
  isOpen.value = false
}
</script>

<style scoped>
.language-select {
  display: flex;
  flex-direction: column;
}

.label {
  margin-bottom: 4px;
  font-size: 14px;
  color: #555;
}

.select-wrapper {
  position: relative;
  border: 1.5px solid #30303D26;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
  background: white;
}

.select-wrapper.select-open {
  border-color: #4a90e2;
}

.selected-value {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chevron {
  width: 20px;
  height: 20px;
  fill: #666;
  margin-left: 8px;
}

.dropdown {
  position: absolute;
  top: 120%;
  left: 0;
  width: 100%;
  background: white;
  border: 1.5px solid #30303D26;
  border-top: none;
  z-index: 10;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
}

.dropdown li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown li:hover {
  background-color: #f0f0f0;
}

.checkmark {
  margin-left: 8px;
}
</style>