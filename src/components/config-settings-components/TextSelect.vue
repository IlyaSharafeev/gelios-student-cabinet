<script setup>
import { ref, computed } from 'vue';
import DoubleRangeSlider from './DoubleRangeSlider.vue';
import Select from './Select.vue';
import checkIcon from '@/assets/check.svg';
import arrowLeftIcon from '@/assets/arrow-left.svg';
import arrowRightIcon from '@/assets/arrow-right.svg';

// Mock vue-i18n
const t = (key) => {
  const translations = {
    'settings.text-select.placeholder': 'Пошук тексту',
    'settings.text-select.radio.title': 'Фільтр питань',
    'settings.text-select.radio.all-texts': 'Усі тексти',
    'settings.text-select.radio.with-questions': 'З питаннями',
    'settings.text-select.radio.without-questions': 'Без питань',
    'settings.text-select.name.title': 'Назва',
    'settings.text-select.word-count.title': 'Кількість слів',
    'settings.text-select.questions.title': 'Питання',
  };
  return translations[key] || key;
};

const props = defineProps({
  titles: Object, // { textName, wordCount, allTextsRadio, withQuestionsRadio, withoutQuestionsRadio, clearButton }
  value: Number,
  options: Array, // [{ id, title, wordCount, questions }]
});

const emit = defineEmits(['update:value', 'filter']);

const ITEMS_PER_PAGE = 10;

const textNameValue = ref('');
const wordCountMin = ref(0);
const wordCountMax = ref(2000);
const hasQuestions = ref('ALL');
const currentPage = ref(0);

const handleSelect = (textId) => {
  emit('update:value', textId);
};

const setDefaults = () => {
  textNameValue.value = '';
  wordCountMin.value = 0;
  wordCountMax.value = 2000;
  hasQuestions.value = 'ALL';
  emit('filter', {
    name: '',
    wordCountMin: 0,
    wordCountMax: 2000,
    hasQuestions: 'ALL',
  });
  currentPage.value = 0;
};

const performFilter = () => {
  emit('filter', {
    name: textNameValue.value,
    wordCountMin: wordCountMin.value,
    wordCountMax: wordCountMax.value,
    hasQuestions: hasQuestions.value,
  });
};

const displayedOptions = computed(() =>
    props.options.slice(currentPage.value * ITEMS_PER_PAGE, (currentPage.value + 1) * ITEMS_PER_PAGE)
);

const pageCount = computed(() => Math.ceil(props.options.length / ITEMS_PER_PAGE));

const handlePageChange = (page) => {
  currentPage.value = page;
};
</script>

<template>
  <div class="wrapper-text-select">
    <div class="wrapper-filters">
      <div class="search-input">
        <label :for="textNameValue">{{ titles.textName }}</label>
        <input
            v-model="textNameValue"
            :placeholder="t('settings.text-select.placeholder')"
            @input="performFilter"
        />
      </div>
      <div class="slider-block">
        <div class="filter-title">{{ titles.wordCount }}</div>
        <DoubleRangeSlider
            :min="0"
            :max="2000"
            v-model:minVal="wordCountMin"
            v-model:maxVal="wordCountMax"
            @update:minVal="performFilter"
            @update:maxVal="performFilter"
        />
      </div>
      <div class="select-block">
        <div class="filter-title">{{ t('settings.text-select.radio.title') }}</div>
        <Select
            v-model="hasQuestions"
            :options="[
            { value: 'ALL', label: t('settings.text-select.radio.all-texts') },
            { value: 'WITH_QUESTIONS', label: t('settings.text-select.radio.with-questions') },
            { value: 'WITHOUT_QUESTIONS', label: t('settings.text-select.radio.without-questions') },
          ]"
            @update:value="performFilter"
        />
      </div>
      <div class="actions-block">
        <button @click="setDefaults">{{ titles.clearButton }}</button>
      </div>
    </div>
    <div class="wrapper-texts">
      <table>
        <thead>
        <tr>
          <th>{{ t('settings.text-select.name.title') }}</th>
          <th>{{ t('settings.text-select.word-count.title') }}</th>
          <th>{{ t('settings.text-select.questions.title') }}</th>
          <th>ID</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="option in displayedOptions"
            :key="option.id"
            @click="handleSelect(option.id)"
            :class="{ 'active-row': value === option.id }"
        >
          <td>{{ option.title }}</td>
          <td>{{ option.wordCount }}</td>
          <td>
            <img v-if="option.questions && option.questions.length > 0" :src="checkIcon" alt="Check icon" />
          </td>
          <td>{{ option.id }}</td>
        </tr>
        </tbody>
      </table>
      <div class="pagination">
        <div
            :class="['previous', { disabled: currentPage === 0 }]"
            @click="currentPage > 0 && handlePageChange(currentPage - 1)"
        >
          <div class="previous-link">
            <img :src="arrowLeftIcon" alt="Left arrow icon" />
          </div>
        </div>
        <span
            v-for="page in pageCount"
            :key="page"
            :class="['page', { active: currentPage === page - 1 }]"
            @click="handlePageChange(page - 1)"
        >
          {{ page }}
        </span>
        <div
            :class="['next', { disabled: currentPage === pageCount - 1 }]"
            @click="currentPage < pageCount - 1 && handlePageChange(currentPage + 1)"
        >
          <div class="next-link">
            <img :src="arrowRightIcon" alt="Right arrow icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-text-select {
  --padding: 30px;
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr 2fr;
  grid-row: span 3;
  grid-column: span 3;
  min-height: 640px;

  .wrapper-filters {
    background-color: #e3ecf5;
    padding: var(--padding);
    padding-bottom: calc(var(--padding) + 48px);
    border-radius: 26px;
    position: relative;

    .filter-title {
      font-size: 20px;
      font-weight: 500;
      color: rgba(48, 48, 61, 0.5);
      margin-bottom: 10px;
    }

    .search-input {
      margin-bottom: 20px;

      label {
        font-size: 20px;
        font-weight: 500;
        color: rgba(48, 48, 61, 0.5);
      }

      input {
        border: 1px solid #adadad;
        border-radius: 18px;
        padding: 12px 16px;
        width: 100%;
        box-sizing: border-box;
        font-size: 16px;
        color: #30303d;
        margin-top: 10px;

        &::placeholder {
          color: rgba(48, 48, 61, 0.2);
        }

        &:focus-visible {
          outline: none;
        }
      }
    }

    .slider-block {
      margin-bottom: 80px;
    }

    .select-block {
      margin-bottom: 20px;
    }

    .actions-block {
      position: absolute;
      bottom: 30px;
      width: calc(100% - (var(--padding) * 2));
      display: flex;
      flex-wrap: wrap;
      gap: 1.25rem;

      button {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        font-size: 16px;
        background: #0066ff;
        color: #fff;
      }
    }
  }

  .wrapper-texts {
    background-color: #ffffff;
    padding: var(--padding);
    border-radius: 26px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;

      tr {
        line-height: 44px;
      }

      tr:hover {
        background-color: #cfcfd1;
        transition: background-color 0.2s ease;
        cursor: pointer;
      }

      th,
      td {
        padding: 0;
        text-align: left;
        font-size: 16px;
        font-weight: 500;
      }

      th:first-child {
        width: 60%;
      }

      th {
        color: #98989e;
      }

      td {
        color: #30303d;
      }

      td:last-child {
        img {
          display: flex;
        }
      }
    }

    .active-row {
      background-color: #e3ecf5;

      td:first-child {
        padding-left: 8px;
        border-radius: 10px 0 0 10px;
      }

      td:last-child {
        border-radius: 0 10px 10px 0;
      }
    }

    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      list-style-type: none;
      width: 100%;
      margin: 0;
      padding: 0;

      .previous,
      .next {
        height: 40px;
        width: 40px;
        background-color: #0066ff;
        border-radius: 8px;
        cursor: pointer;
      }

      .disabled {
        background-color: #bfd7f6;
      }

      .previous-link,
      .next-link {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 40px;

        img {
          height: 20px;
        }
      }

      .page {
        font-size: 14px;
        font-weight: 500;
        color: #667085;
        cursor: pointer;
        margin: 0 8px;
      }

      .active {
        color: #0066ff;
      }
    }
  }
}

@media (min-width: 335px) {
  .wrapper-text-select {
    --padding: 16px;
    grid-template-columns: 1fr;

    .wrapper-filters {
      .actions-block {
        min-width: calc(100% - (var(--padding) * 2));

        button {
          height: 47px;
        }
      }
    }

    .wrapper-texts {
      table {
        tr {
          line-height: 30px;
        }

        th,
        td {
          padding-left: 10px;
          padding-right: 10px;
          font-size: 10px;
          word-wrap: break-word;
        }

        th:first-child {
          width: 40%;
        }
      }
    }
  }
}

@media (min-width: 668px) {
  .wrapper-text-select {
    --padding: 30px;
    grid-template-columns: 1fr 2fr;

    .wrapper-texts {
      table {
        tr {
          line-height: 44px;
        }

        th,
        td {
          font-size: 16px;
        }

        th:first-child {
          width: 25%;
        }
      }
    }
  }
}

@media (min-width: 924px) {
  .wrapper-text-select {
    grid-template-columns: 1fr 2fr;
  }
}
</style>