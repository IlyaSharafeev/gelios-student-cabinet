<script setup lang="ts">
import { defineProps, defineModel } from 'vue';
import type { Item } from '@/types';

defineProps<{
  directions: Item[];
}>();

const selected = defineModel<number | null>({ default: null });
</script>

<template>
  <div class="selected-direction">
    <div class="selected-direction__list">
      <template v-if="selected && directions.find(d => d.id === selected)">
        <div class="selected-direction__item">
          <span class="selected-direction__remove-icon" @click="selected = null">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="#0066FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="selected-direction__name">{{ directions.find(d => d.id === selected)!.name }}</span>
        </div>
      </template>
      <div v-else class="selected-direction__no-items">
        Напрямок не обрано
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selected-direction {
  display: flex;
  justify-content: flex-start;
  width: 100%;

  .selected-direction__list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    border-radius: 4px;

    .selected-direction__item {
      display: flex;
      align-items: center;
      padding: 12px;
      margin-bottom: 8px;
      background: #0066FF1A;
      border-radius: 8px;
      font-family: 'Onest', sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: #0066FF;
      transition: transform 0.1s linear;
      cursor: pointer;

      &:hover {
        background-color: #f0f0f0;
        transform: scale(1.01);
      }
    }

    .selected-direction__remove-icon {
      cursor: pointer;
      margin-right: 12px;
    }

    .selected-direction__name {
      flex: 1;
    }

    .selected-direction__no-items {
      padding: 12px;
      font-family: 'Onest', sans-serif;
      font-size: 16px;
      color: #333;
      text-align: center;
    }
  }
}
</style>