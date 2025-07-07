<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const model = defineModel<string>({ required: true });

const selectedDate = ref('');
const selectedHour = ref('00'); // New ref for hour
const selectedMinute = ref('00'); // New ref for minute

// Watch the model value for initial setup or external changes
watch(model, (newValue) => {
  if (newValue) {
    const dateTime = new Date(newValue);
    selectedDate.value = dateTime.toISOString().split('T')[0];
    selectedHour.value = String(dateTime.getHours()).padStart(2, '0');
    selectedMinute.value = String(dateTime.getMinutes()).padStart(2, '0');
  } else {
    // If model becomes empty, reset date and time inputs
    selectedDate.value = '';
    selectedHour.value = '00';
    selectedMinute.value = '00';
  }
}, { immediate: true });

// Watch selectedDate, selectedHour, and selectedMinute to update the model
watch([selectedDate, selectedHour, selectedMinute], ([date, hour, minute]) => {
  if (date && hour && minute) {
    // Construct the ISO string from the individual parts
    model.value = new Date(`${date}T${hour}:${minute}:00`).toISOString();
  } else {
    model.value = ''; // Set model to empty if date or time is not fully selected
  }
});

const hoursOptions = computed(() => {
  return Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
});

const minutesOptions = computed(() => {
  return Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
});
</script>

<template>
  <div class="deadline-picker">
    <div class="deadline-picker__inputs">
      <input
          v-model="selectedDate"
          type="date"
          class="deadline-picker__date-input"
          :placeholder="$t('add_homework.deadline_placeholder')"
      />
      <div class="deadline-picker__time-inputs">
        <select v-model="selectedHour" class="deadline-picker__time-select">
          <option v-for="hour in hoursOptions" :key="hour" :value="hour">{{ hour }}</option>
        </select>
        <span>:</span>
        <select v-model="selectedMinute" class="deadline-picker__time-select">
          <option v-for="minute in minutesOptions" :key="minute" :value="minute">{{ minute }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.deadline-picker {
  grid-column: 1 / 2;
  margin-top: 34px;

  .deadline-picker__inputs {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .deadline-picker__date-input,
  .deadline-picker__time-select {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #30303d26;
    border-radius: 12px;
    font-family: 'Onest', sans-serif;
    font-size: 16px;
    appearance: none;
    background-color: white;

    &:focus {
      outline: none;
      border-color: #0066ff;
    }
  }

  .deadline-picker__time-inputs {
    display: flex;
    align-items: center;
    gap: 8px;

    .deadline-picker__time-select {
      flex: 1;
      text-align: center;
      padding-right: 30px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      background-size: 12px;
    }

    span {
      font-family: 'Onest', sans-serif;
      font-size: 18px;
      font-weight: 500;
      color: #333;
    }
  }
}
</style>