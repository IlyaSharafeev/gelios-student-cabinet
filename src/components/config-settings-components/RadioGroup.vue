<script setup>
const props = defineProps({
  value: String,
  options: Array, // [{ label: string, value: string }]
});

const emit = defineEmits(['update:value']);
</script>

<template>
  <div class="radio-group">
    <label v-for="(option, index) in options" :key="index" class="option">
      <input
          type="radio"
          :value="option.value"
          :checked="value === option.value"
          @change="emit('update:value', option.value)"
      />
      <span>{{ option.label }}</span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.radio-group {
  display: flex;
  flex-direction: column;

  .option {
    margin-bottom: 10px;

    input[type='radio'] {
      margin-right: 5px;
    }
  }
}
</style>