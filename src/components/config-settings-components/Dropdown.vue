<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: [String, Number], // Поддержка v-model
  options: Array, // [{ label: string, value: string }]
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (value) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="wrapper-select">
    <span
        v-for="option in options"
        :key="option.value"
        :class="['option', { selected: modelValue === option.value }]"
        @click="updateValue(option.value)"
    >
      {{ option.label }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-select {
  display: flex;
  flex-direction: column;
}

.option {
  font-size: 1rem;
  font-weight: 600;
  padding: 12px 16px;
  cursor: pointer;
}

.selected {
  background-color: #0066ff;
  border-radius: 16px;
  color: #ffffff;
}
</style>