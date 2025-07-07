<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Step } from '@/types';

const { t } = useI18n();

defineProps<{
  steps: Step[];
  currentStep: number;
  isNextDisabled: boolean;
}>();

defineEmits<{
  (e: 'next'): void;
  (e: 'prev'): void;
}>();
</script>

<template>
  <div class="stepper-wrapper">
    <div class="stepper">
      <div
          v-for="(step, index) in steps"
          :key="step.id"
          class="step"
          :class="{ active: currentStep === step.id, completed: currentStep > step.id }"
      >
        <div class="step-circle"></div>
        <div v-if="index < steps.length - 1" class="step-line" :class="{ completed: currentStep > step.id }"></div>
        <span class="step-name">{{ step.name }}</span>
      </div>
    </div>

    <div class="navigation">
      <button
          v-if="currentStep > 1"
          class="nav-button back"
          @click="$emit('prev')"
      >
        {{ $t('add_homework.back_button') }}
      </button>
      <button
          class="nav-button next"
          @click="$emit('next')"
          :disabled="isNextDisabled"
      >
        {{ $t('add_homework.next_button') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stepper-wrapper {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.stepper {
  grid-area: 1 / 1 / 2 / 8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 16px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  flex: 1;
}

.step-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #FFE5E5;
  border: 4px solid #FFFFFF;
  z-index: 1;
}

.step.active .step-circle {
  border: 4px solid #FF7B7B;
}

.step.completed .step-circle {
  background-color: #FF7B7B;
  border-color: #FF7B7B;
}

.step-line {
  position: absolute;
  top: 12px;
  width: 100%;
  height: 4px;
  background-color: #FFE5E5;
  z-index: 0;
}

.step.completed .step-line {
  background-color: #FF7B7B;
}

.step-name {
  font-family: 'Onest', sans-serif;
  font-size: 14px;
  color: #000;
  font-weight: 500;
  margin-top: 8px;
  text-align: center;
}

.step.completed .step-name {
  color: #101828;
  font-weight: 600;
  opacity: 60%;
}

.step.active .step-name {
  color: #0066FF;
  font-weight: 600;
}

.navigation {
  grid-area: 1 / 8 / 2 / 13;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.nav-button {
  padding: 15px 44px;
  border-radius: 16px;
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
}

.nav-button.back {
  background-color: #f5f5f5;
  color: #333;
}

.nav-button.next {
  background-color: #0066FF;
  color: white;
}

.nav-button.next:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.nav-button:hover:not(:disabled) {
  opacity: 0.9;
}
</style>
