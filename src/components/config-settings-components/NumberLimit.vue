<script setup>
const props = defineProps({
  value: Number,
  options: Array,
  disabled: Boolean,
});

const emit = defineEmits(['update:value']);
</script>

<template>
  <div class="number-limit">
    <button
        v-for="option in options"
        :key="option"
        :class="{ selected: option <= value }"
        @click="emit('update:value', option)"
        :disabled="disabled"
    >
      {{ option }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.number-limit {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    background: #f0f0f0;
  }

  .selected {
    color: orangered;
    background: #ffe5d9;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>