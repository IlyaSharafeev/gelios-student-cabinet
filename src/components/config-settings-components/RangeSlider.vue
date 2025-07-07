<script setup>
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: [Number, null],
    default: null,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  step: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  displayAggregator: {
    type: Function,
    default: null,
  },
  parentClass: {
    type: String,
    default: '',
  },
  isAlternativeColors: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:value']);

const sliderValue = computed({
  get() {
    const value = props.value !== null && props.value !== undefined ? props.value : props.min;
    console.log('RangeSlider: get value', { value, min: props.min, max: props.max });
    return Math.max(props.min, Math.min(props.max, value));
  },
  set(newValue) {
    const validatedValue = Math.max(props.min, Math.min(props.max, Number(newValue)));
    console.log('RangeSlider: set value', { newValue, validatedValue });
    emit('update:value', validatedValue);
  },
});

const displayValue = computed(() => {
  const value = sliderValue.value;
  console.log('RangeSlider: display value', { value, formatted: props.displayAggregator ? props.displayAggregator(value) : value });
  return props.displayAggregator ? props.displayAggregator(value) : value;
});

const styles = computed(() => ({
  '--background-color': props.isAlternativeColors ? '#ffffff' : '#e3ecf5',
  '--track-color': props.isAlternativeColors ? '#e3ecf5' : '#ffffff',
}));
</script>

<template>
  <div :class="parentClass">
    <span>{{ displayValue }}</span>
    <input
        :style="styles"
        class="input"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model="sliderValue"
        :disabled="disabled"
    />
  </div>
</template>

<style lang="scss" scoped>
.input {
  font-size: 1rem;
  color: #7aadf9;
  --thumb-color: #0066ff;
  --thumb-height: 1rem;
  --track-height: 0.375rem;
  --brightness-hover: 100% !important;
  --brightness-down: 80%;
  --clip-edges: 0.125rem;
  position: relative;
  background-color: var(--background-color);
  overflow: hidden;
  width: 100%;
  height: var(--thumb-height);
  border-radius: 1rem;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  &:disabled {
    filter: grayscale(1);
    opacity: 0.3;
    cursor: not-allowed;
  }

  &::-webkit-slider-runnable-track,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    transition: all ease 100ms;
    height: var(--thumb-height);
  }

  &::-webkit-slider-runnable-track {
    background: linear-gradient(var(--track-color) 0 0) scroll no-repeat center / 100% calc(var(--track-height) + 1px);
  }

  &::-webkit-slider-thumb {
    --thumb-radius: calc((var(--thumb-height) * 0.5) - 1px);
    --clip-top: calc((var(--thumb-height) - var(--track-height)) * 0.5 - 0.5px);
    --clip-bottom: calc(var(--thumb-height) - var(--clip-top));
    --clip-further: calc(100% + 1px);
    --box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0 100vmax currentColor;
    width: var(--thumb-width, var(--thumb-height));
    background-color: var(--thumb-color);
    box-shadow: var(--box-fill);
    border-radius: var(--thumb-width, var(--thumb-height));
    filter: brightness(100%);
    clip-path: polygon(
            100% -1px,
            var(--clip-edges) -1px,
            0 var(--clip-top),
            -100vmax var(--clip-top),
            -100vmax var(--clip-bottom),
            0 var(--clip-bottom),
            var(--clip-edges) 100%,
            var(--clip-further) var(--clip-further)
    );

    &:hover {
      filter: brightness(var(--brightness-hover));
    }

    &:active {
      filter: brightness(var(--brightness-down));
      cursor: grabbing;
    }
  }

  &:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  &::-moz-range-track,
  &::-moz-range-thumb,
  &::-moz-range-progress {
    appearance: none;
    transition: all ease 100ms;
    height: var(--thumb-height);
  }

  &::-moz-range-track {
    background: var(--track-color);
  }

  &::-moz-range-progress {
    background: currentColor;
    height: calc(var(--track-height) + 1px);
    border-radius: var(--track-height);
  }

  &::-moz-range-thumb {
    background: currentColor;
    border: 0;
    width: var(--thumb-width, var(--thumb-height));
    border-radius: var(--thumb-width, var(--thumb-height));
    cursor: pointer;
    filter: brightness(100%);

    &:active {
      cursor: grabbing;
    }

    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  }

  &:active::-moz-range-progress {
    filter: brightness(var(--brightness-down));
  }

  &:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }
}
</style>