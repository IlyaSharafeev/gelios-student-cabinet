<script setup>
import plusIcon from '@/assets/plus.svg';
import minusIcon from '@/assets/minus.svg';

const props = defineProps({
  value: Number,
  min: Number,
  max: Number,
  step: Number,
  disabled: Boolean,
});

const emit = defineEmits(['update:value']);

const handleClick = (direction) => {
  emit('update:value', props.value + props.step * direction);
};
</script>

<template>
  <div class="number-select">
    <span class="number">{{ value }}</span>
    <div class="buttons">
      <button
          @click="handleClick(-1)"
          :disabled="disabled || value - step < min"
      >
        <img :src="minusIcon" alt="Minus icon" />
      </button>
      <button
          @click="handleClick(1)"
          :disabled="disabled || value + step > max"
      >
        <img :src="plusIcon" alt="Plus icon" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 375px) {
  .number-select {
    display: flex;
    flex-direction: column;

    .number {
      font-size: 30px;
      font-weight: 500;
      line-height: 54px;
      margin-bottom: 8px;
    }

    .buttons {
      display: flex;
      gap: 12px;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 50px;
        height: 50px;
        padding: 0;
        border: none;
        background: #f0f0f0;
        border-radius: 4px;
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
}

@media (min-width: 768px) {
  .number-select {
    .number {
      font-size: 54px;
    }
  }
}
</style>