<script setup lang="ts">
import { computed } from 'vue'; // Added import
import type { Item } from '@/types';

const props = defineProps<{
  students: Item[];
}>();

const selected = defineModel<number[]>({ default: [] });

const selectedStudentsList = computed(() => {
  const selectedList = props.students.filter(student => selected.value.includes(student.id));
  return selectedList;
});

const removeStudent = (studentId: number) => {
  selected.value = selected.value.filter(id => id !== studentId);
};
</script>

<template>
  <div class="selected-students">
    <div class="selected-students__list">
      <template v-if="selectedStudentsList.length > 0">
        <div
            v-for="student in selectedStudentsList"
            :key="student.id"
            class="selected-students__item"
        >
          <span class="selected-students__remove-icon" @click="removeStudent(student.id)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="selected-students__name">{{ student.name }}</span>
        </div>
      </template>
      <div v-else class="selected-students__no-items">
        Учнів не обрано
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selected-students {
  grid-column: 1 / -1;

  .selected-students__title {
    font-family: 'Onest', sans-serif;
    font-weight: 500;
    font-size: 32px;
    line-height: 24px;
    letter-spacing: -2%;
    margin-bottom: 32px;
  }

  .selected-students__list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    border-radius: 4px;

    .selected-students__item {
      display: flex;
      align-items: center;
      padding: 12px;
      margin-bottom: 8px;
      background-color: #30303D0D;
      border-radius: 8px;
      font-family: 'Onest', sans-serif;
      font-size: 16px;
      font-weight: 500;
      transition: transform 0.1s linear;
      cursor: pointer;

      &:hover {
        background-color: #f0f0f0;
        transform: scale(1.01);
      }
    }

    .selected-students__remove-icon {
      cursor: pointer;
      margin-right: 12px;
    }

    .selected-students__name {
      flex: 1;
    }

    .selected-students__no-items {
      padding: 12px;
      font-family: 'Onest', sans-serif;
      font-size: 16px;
      color: #333;
      text-align: center;
    }
  }
}
</style>