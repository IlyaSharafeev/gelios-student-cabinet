<template>
  <div class="custom-select" :class="{ 'focused': isOpen }">
    <div class="select-input" @click="toggleDropdown">
      <img :src="selectedOption?.icon" class="icon" v-if="selectedOption?.icon" alt="icon"/>
      <span>{{ selectedOption?.label || placeholder }}</span>
      <svg class="arrow" :class="{ 'open': isOpen }" width="12" height="8" viewBox="0 0 12 8" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M11 6.5L6 1.5L1 6.5" stroke="#30303D" stroke-width="1.66667" stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="dropdown" v-if="isOpen">
      <div
          v-for="option in options"
          :key="option.value"
          class="option"
          :class="{ 'selected': option.value === selectedOption?.value }"
          @click="selectOption(option)"
      >
        <img :src="option.icon" class="icon" v-if="option.icon" alt="icon"/>
        <span>{{ option.label }}</span>
        <svg class="check" v-if="option.value === selectedOption?.value" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="#0066FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch, onMounted, onBeforeUnmount} from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
    validator: (options) => options.every((opt) => 'value' in opt && 'label' in opt),
  },
  placeholder: {
    type: String,
    default: 'Select an option',
  },
  modelValue: {
    type: [String, Number, Object],
    default: null,
  },
  isSelectFirstOptionDefault: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectedOption = ref(null);

watch(
    () => props.modelValue,
    (newValue) => {
      selectedOption.value = props.options.find((opt) => opt.value === newValue) || null;
    }
);

onMounted(() => {
  // If modelValue is provided, use it
  if (props.modelValue !== null) {
    selectedOption.value = props.options.find((opt) => opt.value === props.modelValue) || null;
  }
  // If isSelectFirstOptionDefault is true and no modelValue, select the first option
  else if (props.isSelectFirstOptionDefault && props.options.length > 0) {
    selectedOption.value = props.options[0];
    emit('update:modelValue', selectedOption.value.value);
  }
  document.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  emit('update:modelValue', option.value);
  isOpen.value = false;
};

const handleOutsideClick = (event) => {
  if (!event.target.closest('.custom-select')) {
    isOpen.value = false;
  }
};
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  max-width: 320px;
  font-family: Arial, sans-serif;
}

.select-input {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 12px;
  cursor: pointer;
  background: #fff;
}

.custom-select.focused .select-input {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.arrow {
  margin-left: auto;
  transition: transform 0.2s;
}

.arrow.open {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px -2px #10182808;
  box-shadow: 0px 9px 16px -3px #10182814;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
}

.option {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  cursor: pointer;
}

.option:hover {
  background: #f5f5f5;
}

.option.selected {
  background: #F9FAFB;
}

.check {
  width: 16px;
  height: 16px;
  margin-left: auto;
}
</style>