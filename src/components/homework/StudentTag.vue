<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  student: { id: number; name: string };
}>();

const emit = defineEmits(['remove']);

const removeTag = () => {
  emit('remove', props.student.id);
};
</script>

<template>
  <div class="student-tag">
    <span class="remove-icon" @click="removeTag">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span>{{ student.name }}</span>
  </div>
</template>

<style scoped>
.student-tag {
  display: flex;
  align-items: center;
  background: #30303D0D;
  border-radius: 16px;
  padding: 15px 20px;
  font-family: 'Onest', sans-serif;
  font-size: 14px;
  color: #333;
  gap: 15px;
  font-family: Onest;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0%;
}

.remove-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #757575; /* A subtle color for the cross icon */
}

.remove-icon:hover {
  color: #000;
}
</style>