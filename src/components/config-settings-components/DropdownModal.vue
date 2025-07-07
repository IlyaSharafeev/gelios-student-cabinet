<script setup>
import { ref, computed, watch } from 'vue';
import closeIcon from '@/assets/modal/close.svg';

// Mock vue-i18n
const t = (key) => {
  const translations = {
    'common.setup': 'Налаштувати',
    'settings.columns.number-settings': 'Налаштування чисел',
  };
  return translations[key] || key;
};

const FormulaType = {
  DIRECT_COUNT: 'DIRECT_COUNT',
  FORMULA_OF_FIVE: 'FORMULA_OF_FIVE',
  FORMULA_OF_TEN: 'FORMULA_OF_TEN',
  COMBINATIONS: 'COMBINATIONS',
};

const props = defineProps({
  value: String,
  formula: String,
});

const emit = defineEmits(['update:value']);

const showModal = ref(false);
const formula = ref(props.formula);

const internalValue = computed(() => {
  return props.value ? props.value.split(',').map(Number) : [];
});

watch(() => props.formula, (newFormula) => {
  if (formula.value !== newFormula) {
    formula.value = newFormula;
  }
});

const handleRangeChange = (activeNumbers) => {
  emit('update:value', activeNumbers.join(','));
};

const openModal = () => {
  showModal.value = true;
};

// NumberSelector component
const NumberSelector = defineComponent({
  props: {
    type: String,
    numbers: Array,
    selectedNumbers: Array,
  },
  emits: ['rangeChange'],
  setup(props, { emit }) {
    const handleClick = (number) => {
      if (props.type === 'range') {
        const index = props.numbers.indexOf(number);
        const newActiveNumbers = props.numbers.slice(0, index + 1);
        emit('rangeChange', newActiveNumbers);
      } else if (props.type === 'number') {
        let newActiveNumbers = [...props.selectedNumbers];
        if (newActiveNumbers.includes(number)) {
          newActiveNumbers = newActiveNumbers.filter((n) => n !== number);
        } else {
          newActiveNumbers.push(number);
        }
        emit('rangeChange', newActiveNumbers);
      }
    };

    return () => (
        <div class="range-selector">
          <div>
            {props.numbers.map((number) => (
                <button
                    key={number}
                    onClick={() => handleClick(number)}
                    class={props.selectedNumbers.includes(number) ? '' : 'inactive-number'}
                >
                  {number}
                </button>
            ))}
          </div>
        </div>
    );
  },
});

// MultiNumberSelector component
const MultiNumberSelector = defineComponent({
  props: {
    type: String,
    firstNumbers: Array,
    secondNumbers: Array,
    selectedNumbers: Array,
  },
  emits: ['rangeChange'],
  setup(props, { emit }) {
    const selectedFirstNumbers = ref(props.selectedNumbers.filter((n) => n < 0));
    const selectedSecondNumbers = ref(props.selectedNumbers.filter((n) => n > 0));

    const handleFirstRangeClick = (number) => {
      const index = props.firstNumbers.indexOf(number);
      const newFirstRange = props.firstNumbers.slice(0, index + 1);
      selectedFirstNumbers.value = newFirstRange;
      emit('rangeChange', [...newFirstRange, ...selectedSecondNumbers.value]);
    };

    const handleSecondRangeClick = (number) => {
      const index = props.secondNumbers.indexOf(number);
      const newSecondRange = props.secondNumbers.slice(0, index + 1);
      selectedSecondNumbers.value = newSecondRange;
      emit('rangeChange', [...selectedFirstNumbers.value, ...newSecondRange]);
    };

    return () => (
        <div class="range-selector">
          <div>
            {props.firstNumbers.map((number) => (
                <button
                    key={`first-${number}`}
                    onClick={() => handleFirstRangeClick(number)}
                    class={props.selectedNumbers.includes(number) ? 'active-number' : 'inactive-number'}
                >
                  {number}
                </button>
            ))}
          </div>
          <div>
            {props.secondNumbers.map((number) => (
                <button
                    key={`second-${number}`}
                    onClick={() => handleSecondRangeClick(number)}
                    class={props.selectedNumbers.includes(number) ? 'active-number' : 'inactive-number'}
                >
                  {number}
                </button>
            ))}
          </div>
        </div>
    );
  },
});
</script>

<template>
  <div>
    <div class="setup" @click="openModal">
      <span>{{ t('common.setup') }}</span>
    </div>
    <div v-if="showModal" class="modal-wrapper">
      <div class="modal">
        <div class="header">
          <span class="title">{{ t('settings.columns.number-settings') }}</span>
          <div class="close" @click="showModal = false">
            <img :src="closeIcon" alt="Close icon" />
          </div>
        </div>
        <div class="divider" />
        <div class="body">
          <NumberSelector
              v-if="formula === FormulaType.DIRECT_COUNT"
              type="range"
              :numbers="[4, 5, 6, 7, 8, 9]"
              :selectedNumbers="internalValue"
              @rangeChange="handleRangeChange"
          />
          <MultiNumberSelector
              v-else-if="formula === FormulaType.FORMULA_OF_FIVE"
              type="range"
              :firstNumbers="[-1, -2, -3, -4]"
              :secondNumbers="[1, 2, 3, 4]"
              :selectedNumbers="internalValue"
              @rangeChange="handleRangeChange"
          />
          <MultiNumberSelector
              v-else-if="formula === FormulaType.FORMULA_OF_TEN || formula === FormulaType.COMBINATIONS"
              type="range"
              :firstNumbers="[-1, -2, -3, -4, -5, -6, -7, -8, -9]"
              :secondNumbers="[1, 2, 3, 4, 5, 6, 7, 8, 9]"
              :selectedNumbers="internalValue"
              @rangeChange="handleRangeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$primary: #0066ff;

.setup {
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  margin-top: 1rem;
}

.setup:hover {
  color: $primary;
}

.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .modal {
    min-width: 22.75rem;
    width: fit-content;
    height: 15rem;
    background: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      font-weight: 600;
      font-size: 18px;

      .close {
        cursor: pointer;
      }
    }

    .divider {
      height: 1px;
      background: #eee;
    }

    .body {
      height: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
    }
  }
}

.range-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  div {
    display: flex;
    gap: 0.25rem;
  }

  button {
    width: 60px;
    padding: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  .inactive-number {
    background-color: #dcdcdc;
    color: #000000;
  }

  .active-number {
    background-color: $primary;
    color: #fff;
  }
}
</style>