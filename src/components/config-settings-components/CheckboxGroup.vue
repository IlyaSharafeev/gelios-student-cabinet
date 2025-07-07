<script setup>
import Checkbox from './Checkbox.vue';

const props = defineProps({
  checkboxes: Array, // [{ unit: { key: string, title: string }, value: boolean, disabled: boolean }]
});

const emit = defineEmits(['update:checkboxes']);

const handleChange = (index, value) => {
  const updatedCheckboxes = [...props.checkboxes];
  updatedCheckboxes[index].value = value;
  emit('update:checkboxes', updatedCheckboxes);
};
</script>

<template>
  <div class="checkbox-group">
    <Checkbox
        v-for="(el, index) in checkboxes"
        :key="el.unit.key"
        :title="el.unit.title"
        :value="el.value"
        :disabled="el.disabled"
        @update:value="handleChange(index, $event)"
    />
  </div>
</template>

<style lang="scss" scoped>
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>