<script setup lang="ts">
import { ref, computed } from 'vue';
import { VDataTable, VBtn, VBtnToggle } from 'vuetify/components';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import VueDatePicker from '@vuepic/vue-datepicker';
import { students } from "@/data/homework-page/students.ts";
import '@vuepic/vue-datepicker/dist/main.css';

// Interface for directions
interface Direction {
  id: number;
  name_key: string;
  abbreviation: string;
}

// Filter states
const isCompleted = ref(false);
const selectedStudent = ref('all');
const selectedDirection = ref('all');
const dateRange = ref<string[]>(['', '']);

// Directions data
const directions: Direction[] = [
  { id: 1, name_key: 'all', abbreviation: 'ВСІ' },
  { id: 2, name_key: 'speed_reading', abbreviation: 'ШЧ' },
  { id: 3, name_key: 'mental_arithmetic', abbreviation: 'МА' },
  { id: 4, name_key: 'it', abbreviation: 'IT' },
];

const { t } = useI18n();

// Normalize date to remove time (returns YYYY-MM-DD)
const normalizeDate = (date: Date | string): string => {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0]; // Returns YYYY-MM-DD
};

// Format date for display in DD/MM/YYYY
const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Ukrainian date formatter for table
const formatDate = (dateStr: string): string => {
  if (!dateStr) return ''; // Handle empty date
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return ''; // Handle invalid dates
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('uk-UA', { month: 'long' }).format(date);

  // Check if the string contains time (e.g., includes "T")
  if (dateStr.includes('T')) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${hours}:${minutes}`;
  }
  return `${day} ${month}`; // Only date if no time is present
};

// Clear date range
const clearDateRange = () => {
  dateRange.value = ['', ''];
};

// Table headers
const headers = [
  {
    title: t('homework.table.student'),
    key: 'name',
  },
  { title: t('homework.table.task'), key: 'task' },
  {
    title: t('homework.table.date'),
    key: 'date',
    formatter: (value: string) => formatDate(value),
  },
  { title: t('homework.table.progress'), key: 'progress' },
];

// Computed filtered items
const filteredItems = computed(() => {
  return students
      .filter((item) => {
        if (item.name === t('homework.students.all')) return false;

        const matchesCompleted = isCompleted.value ? item.completed : !item.completed;
        const matchesStudent = selectedStudent.value === 'all' || item.name === selectedStudent.value;
        const matchesDirection = selectedDirection.value === 'all' || item.direction === t(`homework.directions.${selectedDirection.value}`);

        const itemDate = item.date ? normalizeDate(new Date(item.date)) : '';

        // ✅ Захист від помилки, якщо dateRange.value не масив
        const startDate = Array.isArray(dateRange.value) && dateRange.value[0]
            ? normalizeDate(new Date(dateRange.value[0]))
            : '';
        const endDate = Array.isArray(dateRange.value) && dateRange.value[1]
            ? normalizeDate(new Date(dateRange.value[1]))
            : '';

        const matchesDate =
            (!startDate && !endDate) ||
            (itemDate &&
                (!startDate || itemDate >= startDate) &&
                (!endDate || itemDate <= endDate));

        return matchesCompleted && matchesStudent && matchesDirection && matchesDate;
      })
      .map((item) => ({
        ...item,
        date: formatDate(item.date),
        rawDate: item.date,
      }));
});
</script>

<template>
  <div class="homework">
    <h1 class="homework__title">{{ t('homework.title') }}</h1>
    <div class="book-float"></div>
    <!-- Filters -->
    <div class="homework__filters">
      <!-- Completed/Incomplete Toggle Button -->
      <v-btn-toggle
          v-model="isCompleted"
          mandatory
          class="homework__filter-toggle"
          color="primary"
      >
        <v-btn :value="false">{{ t('homework.filters.not_completed') }}</v-btn>
        <v-btn :value="true">{{ t('homework.filters.completed') }}</v-btn>
      </v-btn-toggle>

      <!-- Student Dropdown -->
      <v-select
          v-model="selectedStudent"
          :items="students.map((s) => ({ title: s.name, value: s.name === t('homework.students.all') ? 'all' : s.name }))"
          class="homework__filter-select"
          variant="plain"
          append-icon=""
      >
      </v-select>

      <!-- Direction Dropdown -->
      <v-select
          v-model="selectedDirection"
          :items="directions.map((d) => ({ title: t(`homework.directions.${d.name_key}`), value: d.name_key === 'all' ? 'all' : d.name_key }))"
          class="homework__filter-select"
          variant="plain"
      >
      </v-select>

      <!-- Date Range Picker -->
      <div class="homework__date-picker-wrapper">
        <div class="date-picker-container">
          <VueDatePicker v-model="dateRange" range>
            <template #input-icon>
              <img class="calendar-icon" src="@/assets/images/pages/dashboard/calendar.svg" alt="calendar" />
            </template>
            <template #calendar-icon>
              <img class="slot-icon" src="@/assets/images/pages/dashboard/calendar.svg" alt="calendar" />
            </template>
          </VueDatePicker>
        </div>
      </div>
    </div>

    <!-- Homework Table -->
    <v-data-table
        :headers="headers"
        :items="filteredItems"
        class="homework__table"
        :items-per-page="10"
        :disable-sort="true"
        :hide-default-footer="false"
        :hide-default-header="true"
    >
      <!-- Custom slot for name column to include direction abbreviation -->
      <template v-slot:item.name="{ item }">
        <div class="homework__name-container">
          <span class="homework__student-name">{{ item.name }}</span>
          <span class="homework__direction-abbr">
            {{ directions.find((d) => t(`homework.directions.${d.name_key}`) === item.direction)?.abbreviation || item.direction }}
          </span>
        </div>
      </template>
      <!-- Custom slot for date column to apply conditional coloring -->
      <template v-slot:item.date="{ item }">
        <span :class="item.isUpcoming ? 'homework__date-upcoming' : 'homework__date-default'">
          {{ item.date }}
        </span>
      </template>
      <!-- Custom slot for progress column with router-link and icon -->
      <template v-slot:item.progress="{ item }">
        <router-link :to="`/homework/${item.id}`" class="homework__progress-link">
          {{ t('homework.table.progress') }}
          <v-icon class="homework__progress-icon">mdi-arrow-right</v-icon>
        </router-link>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/mixins/mixins-media" as *;

.homework {
  position: relative;
  padding: 40px 48px;
  border-radius: 32px;
  background-color: #FFFFFF;

  .book-float {
    position: absolute;
    top: -50px;
    right: 48px;
    background-image: url("@/assets/images/pages/dashboard/book.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 136px;
    height: 120px;
  }

  &__title {
    margin-bottom: 40px;
    font-family: "Onest" sans-serif;
    font-weight: 500;
    font-size: 48px;
    line-height: 130%;
    letter-spacing: -2%;
  }

  &__filters {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  &__filter-toggle {
    :deep(.v-btn) {
      height: 44px !important;
      min-height: 44px !important;
      text-transform: none;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      padding: 10px 17px;
    }

    :deep(.v-btn--active) {
      background-color: #0066ff !important;
      color: #ffffff !important;
      border-radius: 16px;
    }

    :deep(.v-btn:not(.v-btn--active)) {
      border-radius: 16px;
    }
  }

  &__filter-select {
    width: 232px;
    max-width: 232px;

    :deep(.v-field) {
      height: 44px !important;
      border-radius: 12px !important;
      border: 1.5px solid #30303D26 !important;
      box-shadow: none !important;
      outline: none !important;
    }

    :deep(.v-field__input) {
      height: 44px !important;
      padding: 0 12px !important;
      display: flex;
      align-items: center;
    }

    :deep(.v-field--focused) {
      outline: none !important;
      box-shadow: none !important;
    }

    :deep(.v-field__append) {
      display: none !important;
    }
  }

  &__date-picker-wrapper {
    width: 286px;

    .calendar-icon {
      margin-left: 10px;
    }
  }

  &__table {
    background-color: transparent;
  }

  :deep(.v-data-table-header) {
    display: none;
  }

  :deep(.v-data-table__tr:not(:first-child):not(:last-child)) {
    border-bottom: 1px solid #e0e0e0;
  }

  :deep(.v-data-table__td) {
    vertical-align: middle;
    padding: 20px 0;
  }

  &__name-container {
    display: flex;
    align-items: center;
  }

  &__direction-abbr {
    color: #1976d2;
    text-transform: uppercase;
    font-weight: 500;
    margin-left: 8px;
  }

  &__student-name {
    font-weight: 400;
  }

  &__date-default {
    color: #1976d2;
    font-weight: 500;
  }

  &__date-upcoming {
    color: #d32f2f;
    font-weight: 500;
  }

  &__progress-link {
    display: inline-flex;
    align-items: center;
    color: #1976d2;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  &__progress-icon {
    margin-left: 4px;
    font-size: 16px;
  }
}

@include media-max(desktop) {
  .homework {
    position: relative;
    padding: 40px 48px;
    border-radius: 32px;
    background-color: #FFFFFF;
    margin: 32px;

    .book-float {
      position: absolute;
      top: -50px;
      right: 48px;
      background-image: url("@/assets/images/pages/dashboard/book.png");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 136px;
      height: 120px;
    }

    &__title {
      margin-bottom: 40px;
      font-family: "Onest" sans-serif;
      font-weight: 500;
      font-size: 48px;
      line-height: 130%;
      letter-spacing: -2%;
    }

    &__filters {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
      align-items: flex-start;
    }

    &__filter-toggle {
      :deep(.v-btn) {
        height: 44px !important;
        min-height: 44px !important;
        text-transform: none;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        padding: 10px 17px;
      }

      :deep(.v-btn--active) {
        background-color: #0066ff !important;
        color: #ffffff !important;
        border-radius: 16px;
      }

      :deep(.v-btn:not(.v-btn--active)) {
        border-radius: 16px;
      }
    }

    &__filter-select {
      width: 232px;
      max-width: 232px;

      :deep(.v-field) {
        height: 44px !important;
        border-radius: 12px !important;
        border: 1.5px solid #30303D26 !important;
        box-shadow: none !important;
        outline: none !important;
      }

      :deep(.v-field__input) {
        height: 44px !important;
        padding: 0 12px !important;
        display: flex;
        align-items: center;
      }

      :deep(.v-field--focused) {
        outline: none !important;
        box-shadow: none !important;
      }

      :deep(.v-field__append) {
        display: none !important;
      }
    }

    &__date-picker-wrapper {
      width: 286px;

      .calendar-icon {
        margin-left: 10px;
      }
    }

    &__table {
      background-color: transparent;
    }

    :deep(.v-data-table-header) {
      display: none;
    }

    :deep(.v-data-table__tr:not(:first-child):not(:last-child)) {
      border-bottom: 1px solid #e0e0e0;
    }

    :deep(.v-data-table__td) {
      vertical-align: middle;
      padding: 20px 0;
    }

    &__name-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__direction-abbr {
      color: #1976d2;
      text-transform: uppercase;
      font-weight: 500;
      margin-left: 0;
      margin-top: 4px;
    }

    &__student-name {
      font-weight: 400;
    }

    &__date-default {
      color: #1976d2;
      font-weight: 500;
    }

    &__date-upcoming {
    color: #d32f2f;
    font-weight: 500;
  }

    &__progress-link {
    display: inline-flex;
    align-items: center;
    color: #1976d2;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

    &__progress-icon {
    margin-left: 4px;
    font-size: 16px;
  }
  }
}
</style>