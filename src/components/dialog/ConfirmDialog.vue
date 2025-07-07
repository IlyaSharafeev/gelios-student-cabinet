<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  title: string;
  description: string;
}>();

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>

<template>
  <div v-if="isOpen" class="dialog-overlay">
    <div class="dialog-container">
      <p class="dialog-message-title">{{ title }}</p>
      <p class="dialog-message">{{ description }}</p>
      <div class="dialog-buttons">
        <button class="cancel-button" @click="emit('cancel')">Скасувати</button>
        <button class="confirm-button" @click="emit('confirm')">Підтвердити</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-container {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  max-width: 527px;
  width: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.dialog-message {
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #333;
  margin-bottom: 24px;
  margin-top: 24px;
  text-align: center;
}

.dialog-message-title {
  font-family: Onest;
  font-weight: 500;
  font-size: 32px;
  line-height: 120%;
  letter-spacing: -2%;
  text-align: center;
}

.dialog-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.cancel-button,
.confirm-button {
  padding: 10px 20px;
  border-radius: 12px;
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  width: 233px;
}

.cancel-button {
  background: #FFFFFF;
  color: #FF3030;
  border: 1.5px solid #FF3030
}

.cancel-button:hover {
  background: #F0F0F0;
}

.confirm-button {
  background: #0066FF;
  color: #FFFFFF;
  border: none;
}

.confirm-button:hover {
  background: #0056B3;
}
</style>