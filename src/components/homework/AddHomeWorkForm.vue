<script setup lang="ts">
import { reactive, computed, watch, ref, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import StepNavigator from './StepNavigator.vue';
import StudentSelector from './StudentSelector.vue';
import TrainerSelector from './TrainerSelector.vue';
import StudentTag from './StudentTag.vue';
import successImage from '@/assets/backgrounds/certification/success.png';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// Import images for trainers
import trainer1 from '@/assets/backgrounds/trainers/1.png';
import trainer2 from '@/assets/backgrounds/trainers/2.png';
import trainer3 from '@/assets/backgrounds/trainers/3.png';
import trainer4 from '@/assets/backgrounds/trainers/4.png';
import trainer5 from '@/assets/backgrounds/trainers/5.png';
import trainer6 from '@/assets/backgrounds/trainers/6.png';
import trainer7 from '@/assets/backgrounds/trainers/7.png';
import trainer8 from '@/assets/backgrounds/trainers/8.png';
import trainer9 from '@/assets/backgrounds/trainers/9.png';
import trainer10 from '@/assets/backgrounds/trainers/10.png';
import trainer11 from '@/assets/backgrounds/trainers/11.png';
import trainer12 from '@/assets/backgrounds/trainers/12.png';
import trainer13 from '@/assets/backgrounds/trainers/13.png';
import trainer14 from '@/assets/backgrounds/trainers/14.png';
import trainer15 from '@/assets/backgrounds/trainers/15.png';
import trainer16 from '@/assets/backgrounds/trainers/16.png';

const { t, locale } = useI18n();

const currentStep = reactive({ value: 1 });
const steps = [
  { id: 1, name: t('add_homework.step1_title') },
  { id: 2, name: t('add_homework.step2_title') },
  { id: 3, name: t('add_homework.step3_title') },
];

const students = [
  { id: 1, name: 'Олег Петренко' },
  { id: 2, name: 'Анна Ковальчук' },
  { id: 3, name: 'Іван Мельник' },
  { id: 4, name: 'Марія Сидоренко' },
  { id: 5, name: 'Віктор Бондаренко' },
  { id: 6, name: 'Наталія Мороз' },
  { id: 7, name: 'Андрій Ткаченко' },
  { id: 8, name: 'Олена Савченко' },
  { id: 9, name: 'Сергій Кравчук' },
  { id: 10, name: 'Юлія Поліщук' },
  { id: 11, name: 'Дмитро Шевченко' },
  { id: 12, name: 'Ірина Марченко' },
  { id: 13, name: 'Володимир Коваленко' },
  { id: 14, name: 'Тетяна Лисенко' },
  { id: 15, name: 'Олексій Клименко' },
  { id: 16, name: 'Ольга Іванова' },
  { id: 17, name: 'Михайло Гончаренко' },
  { id: 18, name: 'Людмила Федорова' },
  { id: 19, name: 'Павло Руденко' },
  { id: 20, name: 'Галина Степаненко' },
  { id: 21, name: 'Євген Колесник' },
  { id: 22, name: 'Валентина Кузьменко' },
  { id: 23, name: 'Роман Бойко' },
  { id: 24, name: 'Софія Самойленко' },
  { id: 25, name: 'Артем Василенко' },
  { id: 26, name: 'Вікторія Демченко' },
  { id: 27, name: 'Максим Соколов' },
  { id: 28, name: 'Катерина Прокопенко' },
  { id: 29, name: 'Денис Литвиненко' },
  { id: 30, name: 'Христина Романенко' },
  { id: 31, name: 'Богдан Коробко' },
  { id: 32, name: 'Зоряна Мельник' },
  { id: 33, name: 'Тарас Савчук' },
  { id: 34, name: 'Надія Пасічник' },
  { id: 35, name: 'Остап Гнатюк' },
  { id: 36, name: 'Яна Левченко' },
  { id: 37, name: 'Юрій Бондар' },
  { id: 38, name: 'Людмила Костюк' },
  { id: 39, name: 'Андріана Іванченко' },
  { id: 40, name: 'Олег Садовий' },
  { id: 41, name: 'Христина Козак' },
  { id: 42, name: 'Віталій Семенюк' },
  { id: 43, name: 'Марта Білоус' },
  { id: 44, name: 'Ігор Ткачук' },
  { id: 45, name: 'Дарина Коваль' },
  { id: 46, name: 'Анатолій Вознюк' },
  { id: 47, name: 'Лариса Бондарчук' },
  { id: 48, name: 'Григорій Морозюк' },
  { id: 49, name: 'Світлана Олійник' },
  { id: 50, name: 'Юрій Шевчук' },
];

const trainers = [
  { id: 1, name: t('add_homework.trainers.find_pair'), image: trainer1, iframeUrl: import.meta.env.VITE_ABACUS_URL },
  { id: 2, name: t('add_homework.trainers.speed_reading_technique'), image: trainer2, iframeUrl: import.meta.env.VITE_ALPHABET_URL },
  { id: 3, name: t('add_homework.trainers.schulte_table'), image: trainer3, iframeUrl: import.meta.env.VITE_SCHULTE_TABLE_URL },
  { id: 4, name: t('add_homework.trainers.spritz'), image: trainer4, iframeUrl: import.meta.env.VITE_SPRITZ_URL },
  { id: 5, name: t('add_homework.trainers.mental_arithmetic'), image: trainer5, iframeUrl: import.meta.env.VITE_SPEED_MATH_URL },
  { id: 6, name: t('add_homework.trainers.fillwords'), image: trainer6, iframeUrl: import.meta.env.VITE_FILLWORDS_URL },
  { id: 7, name: t('add_homework.trainers.stroop_test'), image: trainer7, iframeUrl: import.meta.env.VITE_STROOP_TEST_URL },
  { id: 8, name: t('add_homework.trainers.alphabet'), image: trainer8, iframeUrl: import.meta.env.VITE_ALPHABET_URL },
  { id: 9, name: t('add_homework.trainers.find_word'), image: trainer9, iframeUrl: import.meta.env.VITE_FIND_THE_WORD_URL },
  { id: 10, name: t('add_homework.trainers.texts'), image: trainer10, iframeUrl: import.meta.env.VITE_TEXTS_URL },
  { id: 11, name: t('add_homework.trainers.cybercat'), image: trainer11, iframeUrl: import.meta.env.VITE_DINO_URL },
  { id: 12, name: t('add_homework.trainers.flashcards'), image: trainer12, iframeUrl: import.meta.env.VITE_FLASH_CARDS_URL },
  { id: 13, name: t('add_homework.trainers.abacus'), image: trainer13, iframeUrl: import.meta.env.VITE_ABACUS_URL },
  { id: 14, name: t('add_homework.trainers.find_cybercat'), image: trainer14, iframeUrl: import.meta.env.VITE_FIND_THE_CYBER_CAT_URL },
  { id: 15, name: t('add_homework.trainers.mnemonics'), image: trainer15, iframeUrl: import.meta.env.VITE_MNEMONICS_URL },
  { id: 16, name: t('add_homework.trainers.columns'), image: trainer16, iframeUrl: import.meta.env.VITE_COLUMNS_URL },
];

const selectedStudents = reactive({ value: [] as number[] });
const selectedTrainer = reactive({ value: null as { id: number; name: string; image?: string; iframeUrl: string } | null });
const deadline = reactive({ value: '' as string | Date });
const isLoadingIframe = ref(false);
const iframeData = reactive({ value: null as any });

const isStep1Valid = computed(() => {
  return selectedStudents.value.length > 0 && selectedTrainer.value !== null;
});

const isStep3Valid = computed(() => {
  console.log('isStep3Valid computed:', deadline.value, deadline.value !== '');
  return deadline.value !== '';
});

const selectedStudentsWithNames = computed(() => {
  return selectedStudents.value
      .map(id => {
        const student = students.find(s => s.id === id);
        return student ? { id: student.id, name: student.name } : undefined;
      })
      .filter((student): student is { id: number; name: string } => student !== undefined);
});

const removeStudent = (studentId: number) => {
  selectedStudents.value = selectedStudents.value.filter(id => id !== studentId);
};

const resetForm = () => {
  selectedStudents.value = [];
  selectedTrainer.value = null;
  deadline.value = '';
  iframeData.value = null;
  currentStep.value = 1;
};

const homeworkDataForBackend = computed(() => {
  if (isStep1Valid.value && isStep3Valid.value) {
    return {
      studentIds: selectedStudents.value,
      trainerId: selectedTrainer.value?.id,
      deadline: deadline.value instanceof Date ? deadline.value.toISOString() : deadline.value,
      homeWorkSettings: iframeData.value,
    };
  }
  return null;
});

const addHomework = () => {
  if (isStep3Valid.value) {
    currentStep.value = 4;
  }
};

// В файле AddHomeWorkForm.vue

const handleIframeMessage = (event: MessageEvent) => {
  // Проверка origin для безопасности
  if (selectedTrainer.value && event.origin === new URL(selectedTrainer.value.iframeUrl).origin) {
    const receivedData = event.data; // Получаем весь объект данных, отправленный из iframe
    const payload = receivedData.payload;
    const messageType = receivedData.type; // Получаем тип сообщения, например, 'initialSettingsLoaded' или 'gamePlayed'

    // Проверяем наличие payload и gameId в payload
    if (!payload || !payload.gameId) {
      console.warn('Получено сообщение, но отсутствует payload или gameId.', receivedData);
      return;
    }

    // Извлекаем gameName из payload.gameId, например, "VOOP:Gelios:flashCards" -> "flashCards"
    const gameIdParts = payload.gameId.split(':');
    const iframeGameName = gameIdParts[gameIdParts.length - 1]; // Получаем 'flashCards'

    // Формируем ключ для конфигурации, используя имя игры, полученное из iframe
    const configKey = `VOOP:Gelios:${iframeGameName}:Config`;

    // Если это сообщение с первоначальными настройками
    if (messageType === 'initialSettingsLoaded') {
      const settingsFromIframe = payload[configKey]; // Получаем настройки по динамическому ключу
      if (settingsFromIframe) {
        console.log('Получены первоначальные настройки из iframe:', settingsFromIframe);
        // Данные уже являются объектом (благодаря mapToObject в iframe), поэтому JSON.parse не нужен
        iframeData.value = settingsFromIframe;
      } else {
        console.warn('Получено сообщение initialSettingsLoaded, но конфигурация не найдена по ключу:', configKey, payload);
      }
    } else if (messageType === 'gamePlayed') {
      // Это часть для обработки результатов игры.
      console.log('Получено сообщение gamePlayed из iframe:', payload);
      // Здесь вы можете обработать результаты игры, если это необходимо,
      // но это не должно обновлять iframeData.value, которое предназначено для настроек.
    }
  }
};

window.addEventListener('message', handleIframeMessage);

onUnmounted(() => {
  window.removeEventListener('message', handleIframeMessage);
});

watch(() => currentStep.value, (newVal) => {
  if (newVal === 4 && homeworkDataForBackend.value) {
    console.log('Homework Data for Backend:', homeworkDataForBackend.value);
  }
  if (newVal === 2 && selectedTrainer.value?.iframeUrl) {
    isLoadingIframe.value = true;
  } else {
    isLoadingIframe.value = false;
  }
});

watch(() => deadline.value, (newVal) => {
  console.log('deadline.value changed:', newVal);
});

watch(isStep3Valid, (newVal) => {
  console.log('isStep3Valid changed:', newVal);
});

const addMoreHomework = () => {
  resetForm();
};

const nextStep = () => {
  if (currentStep.value === 3) {
    addHomework();
  } else if (currentStep.value === 1 && !isStep1Valid.value) {
    return;
  } else if (currentStep.value < 3) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const handleIframeLoad = () => {
  isLoadingIframe.value = false;
};
</script>

<template>
  <div class="homework-form">
    <div class="homework-form__header" v-if="currentStep.value > 1 && currentStep.value < 4">
      <span class="homework-form__back-arrow" @click="prevStep">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="#0066FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <h1 class="homework-form__header-title">{{ steps[currentStep.value - 1].name }}</h1>
    </div>

    <div v-if="currentStep.value === 1" class="step-content">
      <StudentSelector
          :items="students"
          v-model="selectedStudents.value"
          :title="$t('students_page.title')"
          :search-placeholder="$t('students_page.search_placeholder')"
          :no-items-text="$t('add_homework.no_students_found')"
          :select-all-text="$t('add_homework.select_all_students')"
      />
      <TrainerSelector
          :items="trainers"
          v-model="selectedTrainer.value"
          :title="$t('add_homework.trainer_title')"
          :search-placeholder="$t('students_page.search_placeholder')"
          :no-items-text="$t('add_homework.no_trainers_found')"
      >
        <template #option="{ item }">
          <div class="trainer-option">
            <img
                v-if="item.image"
                :src="item.image"
                alt="Trainer Image"
                class="trainer-image"
            />
            <span>{{ item.name }}</span>
          </div>
        </template>
      </TrainerSelector>
    </div>

    <div v-if="currentStep.value === 2" class="step-content">
      <div class="selected-students-tags">
        <StudentTag
            v-for="student in selectedStudentsWithNames"
            :key="student.id"
            :student="student"
            @remove="removeStudent"
        />
      </div>
      <div class="iframe-container">
        <div v-if="isLoadingIframe" class="spinner-overlay">
          <div class="spinner"></div>
        </div>
        <iframe
            v-if="selectedTrainer.value?.iframeUrl"
            :src="selectedTrainer.value.iframeUrl"
            class="trainer-iframe"
            frameborder="0"
            allowfullscreen
            @load="handleIframeLoad"
            :class="{ 'iframe-hidden': isLoadingIframe }"
        ></iframe>
      </div>
    </div>

    <div v-if="currentStep.value === 3" class="step-content">
      <DatePicker
          class="datepicker-container"
          v-model="deadline.value"
          :locale="locale"
          :placeholder="$t('add_homework.deadline_placeholder')"
      />
    </div>

    <div v-if="currentStep.value === 4" class="step-content step-success">
      <div class="success-step">
        <img :src="successImage" alt="Success" class="success-image" />
        <h2>{{ $t('add_homework.success_title') }}</h2>
        <button class="add-more-button" @click="addMoreHomework">
          {{ $t('add_homework.ready') }}
        </button>
      </div>
    </div>

    <StepNavigator
        v-if="currentStep.value < 4"
        :steps="steps"
        :current-step="currentStep.value"
        :is-next-disabled="currentStep.value === 1 ? !isStep1Valid : currentStep.value === 3 ? !isStep3Valid : false"
        :is-button-visible="currentStep.value < 3"
        @next="nextStep"
        @prev="prevStep"
    />
  </div>
</template>

<style scoped>
.homework-form {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.homework-form__header {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
}

.homework-form__back-arrow {
  cursor: pointer;
  margin-right: 10px;
}

.homework-form__header-title {
  font-family: 'Onest', sans-serif;
  font-weight: bold 500;
  font-size: 32px;
  color: #333;
}

.step-content {
  display: grid;
  grid-column-gap: 20px;
  margin-bottom: 32px;
}

.selected-students-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  margin-top: 38px;
}

.iframe-container {
  position: relative;
  width: 100%;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
}

.trainer-iframe {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.iframe-hidden {
  visibility: hidden;
}

.spinner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: 8px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.step-success {
  grid-column: 1 / 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.trainer-option {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
}

.trainer-image {
  width: 60px;
  height: 40px;
  object-fit: contain;
  border-radius: 4px;
}

.success-image {
  width: 633px;
  height: 350px;
  object-fit: contain;
  margin-bottom: 16px;
}

.success-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.datepicker-container {
  margin-top: 31px;
}

.success-step h2 {
  font-family: Onest;
  font-weight: 500;
  font-size: 48px;
  line-height: 120%;
  letter-spacing: -2%;
  text-align: center;
}

.add-more-button {
  min-width: 280px;
  background: #0066FF;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 16px;
  cursor: pointer;
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-top: 16px;
}

.add-more-button:hover {
  background: #0056b3;
}
</style>