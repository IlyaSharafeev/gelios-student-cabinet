<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  min: Number,
  max: Number,
  step: Number,
  minVal: Number,
  maxVal: Number,
});

const emit = defineEmits(['update:minVal', 'update:maxVal']);

const localMinVal = ref(props.minVal);
const localMaxVal = ref(props.maxVal);

// Ensure minVal <= maxVal
watch([localMinVal, localMaxVal], ([newMin, newMax]) => {
  if (newMin > newMax) {
    localMinVal.value = newMax;
    localMaxVal.value = newMin;
  }
  emit('update:minVal', localMinVal.value);
  emit('update:maxVal', localMaxVal.value);
});

// Track positions for styling
const rangeStyle = computed(() => {
  const minPercent = ((localMinVal.value - props.min) / (props.max - props.min)) * 100;
  const maxPercent = ((localMaxVal.value - props.min) / (props.max - props.min)) * 100;
  return {
    left: `${minPercent}%`,
    width: `${maxPercent - minPercent}%`,
  };
});
</script>

<template>
  <div class="double-range-slider">
    <div class="bar">
      <div class="bar-left" :style="{ width: `${((localMinVal - min) / (max - min)) * 100}%` }"></div>
      <div class="bar-inner" :style="rangeStyle"></div>
      <div class="bar-right" :style="{ width: `${((max - localMaxVal) / (max - min)) * 100}%` }"></div>
    </div>
    <input
        type="range"
        class="input-type-range"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="localMinVal"
    />
    <input
        type="range"
        class="input-type-range"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="localMaxVal"
    />
    <div class="caption" :style="{ left: `${((localMinVal - min) / (max - min)) * 100}%` }">
      <span>{{ localMinVal }}</span>
    </div>
    <div class="caption" :style="{ left: `${((localMaxVal - min) / (max - min)) * 100}%` }">
      <span>{{ localMaxVal }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.double-range-slider {
  display: flex;
  position: relative;
  border-radius: 10px;
  padding: 0 8px;
  flex-direction: column;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .bar {
    display: flex;
    height: 6px;
    margin: 6px 0;
  }

  .bar-left {
    background-color: #f4f4f4;
    border-radius: 12px;
  }

  .bar-right {
    background-color: #f4f4f4;
    border-radius: 12px;
  }

  .bar-inner {
    background-color: rgba(0, 102, 255, 0.5);
    position: absolute;
    height: 6px;
  }

  .input-type-range {
    position: absolute;
    top: 6px;
    left: 0;
    width: 100%;
    height: 6px;
    -webkit-appearance: none;
    background: transparent;
    pointer-events: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      background: #0066ff;
      border-radius: 50%;
      cursor: pointer;
      pointer-events: auto;
      margin-top: -5px;
    }

    &::-moz-range-thumb {
      width: 16px;
      height: 16px;
      background: #0066ff;
      border-radius: 50%;
      cursor: pointer;
      pointer-events: auto;
    }
  }

  .caption {
    position: absolute;
    bottom: -28px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;

    &:before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #30303d;
      bottom: 12px;
      z-index: 5;
    }

    span {
      color: #ffffff;
      background-color: #30303d;
      font-size: 12px;
      font-weight: 600;
      position: absolute;
      text-align: center;
      border-radius: 8px;
      padding: 8px 10px;
    }
  }
}
</style>