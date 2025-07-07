<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Определяем пропсы
const props = defineProps<{
  modelValue: boolean;
  label: string;
  id: string;
}>();

// Определяем эмиттеры
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

// Обработчик изменения чекбокса
const updateValue = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.checked);
};
</script>

<template>
  <div class="custom-checkbox">
    <input
        :id="id"
        type="checkbox"
        :checked="modelValue"
        @change="updateValue"
        class="checkbox-input"
    />
    <label :for="id" class="checkbox-label"></label>
    <span class="label-text">{{ label }}</span>
  </div>
</template>

<style scoped lang="scss">
.custom-checkbox {
  display: flex;
  align-items: center;

  .checkbox-input {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  .checkbox-label {
    cursor: pointer;
    width: 36px;
    height: 20px;
    background: #ccc;
    display: block;
    border-radius: 30px;
    position: relative;
    overflow: hidden;
  }

  .checkbox-label:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 26px;
    transition: 0.3s;
  }

  .checkbox-input:checked + .checkbox-label {
    background: #0066FF;
  }

  .checkbox-input:checked + .checkbox-label:after {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }

  .checkbox-label:active:after {
    width: 36px;
  }

  .label-text {
    color: #333;
    font-size: 16px;
    white-space: nowrap;
    margin-left: 16px;
    font-weight: 400;
  }
}
</style>