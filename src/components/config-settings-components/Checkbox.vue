<script setup>
const props = defineProps({
  title: String,
  value: Boolean,
  disabled: Boolean,
});

const emit = defineEmits(['update:value']);

const handleChange = () => {
  emit('update:value', !props.value);
};
</script>

<template>
  <div :class="['checkbox-wrapper', { checked: value }]">
    <input
        :id="title"
        class="checkbox-input"
        type="checkbox"
        :checked="value"
        @change="handleChange"
        :disabled="disabled"
    />
    <label class="checkbox-label" :for="title">
      <div class="wrapper">
        <span>
          <svg width="12px" height="14px" viewBox="0 2 14 12">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </span>
        <span>{{ title }}</span>
      </div>
    </label>
  </div>
</template>

<style lang="scss" scoped>
$primary: #0066ff;
$white: #ffffff;
$gray: #ccc;
$gray-medium: #666;

.checked {
  background-color: $primary;
  border-radius: 16px;
  color: $white;
  padding: 12px 16px;
}

.checkbox-wrapper {
  padding: 12px 16px;

  .checkbox-input {
    position: absolute;
    visibility: hidden;
  }

  .checkbox-label {
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.2s ease;

    .wrapper {
      display: flex;
      align-items: center;
    }

    span {
      float: left;
      vertical-align: middle;
      transform: translate3d(0, 0, 0);

      &:first-child {
        position: relative;
        width: 14px;
        min-width: 14px;
        height: 14px;
        min-height: 14px;
        border-radius: 4px;
        transform: scale(1);
        border: 1px solid $primary;
        transition: all 0.2s ease;
        box-shadow: 0 1px 1px rgba(0, 16, 75, 0.05);

        svg {
          position: absolute;
          top: 2px;
          left: 1px;
          fill: none;
          stroke: $primary;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 16px;
          stroke-dashoffset: 16px;
          transition: all 0.3s ease;
          transition-delay: 0.1s;
          transform: translate3d(0, 0, 0);
        }
      }

      &:last-child {
        line-height: 21px;
        font-size: 1rem;
        font-weight: 600;
        margin-left: 0.5rem;
      }
    }
  }

  .checkbox-input:checked + .checkbox-label {
    span {
      &:first-child {
        background: $white;
        border-color: $white;
        animation: wave 0.4s ease;

        svg {
          stroke-dashoffset: 0;
        }
      }
    }
  }

  .checkbox-input:disabled + .checkbox-label {
    cursor: not-allowed;
    opacity: 40%;

    span {
      &:first-child {
        border-color: $gray;
      }

      &:last-child {
        color: $gray-medium;
      }
    }
  }

  @keyframes wave {
    50% {
      transform: scale(0.9);
    }
  }
}
</style>