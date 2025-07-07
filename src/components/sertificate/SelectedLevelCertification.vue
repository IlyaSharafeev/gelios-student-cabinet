<script setup lang="ts">
import { defineProps, defineModel } from 'vue';

interface Level {
  id: number;
  name: string;
  image: string;
}

defineProps<{
  levels: Level[];
}>();

const selectedLevel = defineModel<number[]>({ default: [] });

const removeLevel = (levelId: number) => {
  selectedLevel.value = selectedLevel.value.filter(id => id !== levelId);
};
</script>

<template>
  <div class="selected-level">
    <div v-if="selectedLevel.length > 0" class="level-options">
      <div v-for="levelId in selectedLevel" :key="levelId" class="level-option">
        <div class="level-name-container">
          <span class="level-name">{{ levels.find(l => l.id === levelId)!.name }}</span>
          <span
              class="level-remove-icon"
              @click="removeLevel(levelId)"
              v-if="selectedLevel.length > 1"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="#0066FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
        <img
            :src="levels.find(l => l.id === levelId)!.image"
            :alt="levels.find(l => l.id === levelId)!.name"
            class="level-image"
        />
      </div>
    </div>
    <div v-else class="no-selection">
      <span>Рівень не вибрано</span>
    </div>
  </div>
</template>

<style scoped>
.selected-level {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
}

.level-options {
  display: flex;
  flex-direction: row;
  gap: 30px;
}

.level-option {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.level-name-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.level-name {
  font-family: 'Onest', sans-serif;
  font-size: 16px;
  color: #333;
  font-family: Onest;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
}

.level-remove-icon {
  cursor: pointer;
}

.level-image {
  width: 192px;
  height: 136px;
  object-fit: contain;
  border-radius: 5px;
}

.no-selection {
  font-family: 'Onest', sans-serif;
  font-size: 16px;
  color: #333;
}
</style>