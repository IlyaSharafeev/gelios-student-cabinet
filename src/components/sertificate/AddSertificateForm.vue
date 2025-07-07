<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import StudentSelector from './StudentSelector.vue';
import SelectedStudentsCertification from './SelectedStudentsCertification.vue';
import SelectedLevelCertification from './SelectedLevelCertification.vue';
import SelectedDirection from './SelectedDirection.vue';
import LanguageSelector from './LanguageSelector.vue';
import { jsPDF } from 'jspdf';

import itGeliosStartEn from "@/assets/backgrounds/certificate-level-en/IT Gelios Start.png";
import SchooolPreparationEn from "@/assets/backgrounds/certificate-level-en/Підготовка до школи.png";
import SpeechTherapyEn from "@/assets/backgrounds/certificate-level-en/Логопедія.png";
import MentalArithmeticEn from "@/assets/backgrounds/certificate-level-en/Ментальна арифметика.png";
import MentalArithmeticEn1 from "@/assets/backgrounds/certificate-level-en/Ментальна арифметика - 1.png";
import MentalArithmeticEn2 from "@/assets/backgrounds/certificate-level-en/Ментальна арифметика - 2.png";
import MentalArithmeticEn3 from "@/assets/backgrounds/certificate-level-en/Ментальна арифметика - 3.png";
import MentalArithmeticEn4 from "@/assets/backgrounds/certificate-level-en/Ментальна арифметика - 4.png";
import MultiplicationandDivisionEn from "@/assets/backgrounds/certificate-level-en/Множення і ділення.png";

import SpeedReadingEn from "@/assets/backgrounds/certificate-level-en/Швидкочитання.png";
import SpeedReadingEn1 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 1.png";
import SpeedReadingEn2 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 2.png";
import SpeedReadingEn3 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 3.png";
import SpeedReadingEn4 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 4.png";
import SpeedReadingEn5 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 5.png";
import SpeedReadingEn6 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 6.png";

import SpeedReadingSpeechTherapyEn1 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 1.png";
import SpeedReadingSpeechTherapyEn2 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 2.png";
import SpeedReadingSpeechTherapyEn3 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 3.png";
import SpeedReadingSpeechTherapyEn4 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 4.png";
import SpeedReadingSpeechTherapyEn5 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 5.png";
import SpeedReadingSpeechTherapyEn6 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 6.png";
import SpeedReadingSpeechTherapyEn from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія.png";



import itGeliosStartUk from "@/assets/backgrounds/certificate-level-uk/IT Gelios Start.png";
import SchooolPreparationUk from "@/assets/backgrounds/certificate-level-uk/Підготовка до школи.png";
import SpeechTherapyUk from "@/assets/backgrounds/certificate-level-uk/Логопедія.png";
import MentalArithmeticUk from "@/assets/backgrounds/certificate-level-uk/Ментальна арифметика.png";
import MentalArithmeticUk1 from "@/assets/backgrounds/certificate-level-uk/Ментальна арифметика - 1.png";
import MentalArithmeticUk2 from "@/assets/backgrounds/certificate-level-uk/Ментальна арифметика - 2.png";
import MentalArithmeticUk3 from "@/assets/backgrounds/certificate-level-uk/Ментальна арифметика - 3.png";
import MentalArithmeticUk4 from "@/assets/backgrounds/certificate-level-uk/Ментальна арифметика - 4.png";
import MultiplicationandDivisionUkr from "@/assets/backgrounds/certificate-level-uk/Множення і ділення.png";
import SpeedReadingUk from "@/assets/backgrounds/certificate-level-uk/Швидкочитання.png";
import SpeedReadingUk1 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 1.png";
import SpeedReadingUk2 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 2.png";
import SpeedReadingUk3 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 3.png";
import SpeedReadingUk4 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 4.png";
import SpeedReadingUk5 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 5.png";
import SpeedReadingUk6 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 6.png";

import SpeedReadingSpeechTherapyUk1 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 1.png";
import SpeedReadingSpeechTherapyUk2 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 2.png";
// import SpeedReadingSpeechTherapyUk3 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 3.png";
import SpeedReadingSpeechTherapyUk4 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 4.png";
import SpeedReadingSpeechTherapyUk5 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 5.png";
import SpeedReadingSpeechTherapyUk6 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 6.png";
import SpeedReadingSpeechTherapyUk from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія.png";

import successImage from '@/assets/backgrounds/certification/success.png';
import NunitoFont from '@/assets/fonts/Nunito-VariableFont_wght.ttf';
import MarckScriptFont from '@/assets/fonts/MarckScript-Regular.ttf';

const ukrainianDirectionLevels = [
  { id: 1, name: 'Логопедія', levels: [{ id: 1, name: 'Basic', image: SpeechTherapyUk }] },
  {
    id: 2,
    name: 'Ментальна арифметика',
    levels: [
      { id: 1, name: 'Джуніор', image: MentalArithmeticUk1 },
      { id: 2, name: 'Базовий', image: MentalArithmeticUk2 },
      { id: 3, name: 'Основний', image: MentalArithmeticUk3 },
      { id: 4, name: 'Просунутий', image: MentalArithmeticUk4 },
      { id: 5, name: 'Повний курс', image: MentalArithmeticUk }
    ]
  },
  { id: 3, name: 'Множення і ділення', levels: [{ id: 1, name: 'Повний курс', image: MultiplicationandDivisionUkr }] },
  { id: 4, name: 'Підготовка до школи', levels: [{ id: 1, name: 'Повний курс', image: SchooolPreparationEn }] },
  {
    id: 5,
    name: 'Швидкочитання',
    levels: [
      { id: 1, name: 'Джуніор', image: SpeedReadingUk1 },
      { id: 2, name: 'Базовий', image: SpeedReadingUk2 },
      { id: 3, name: 'Основний', image: SpeedReadingUk3 },
      { id: 4, name: 'Просунутий', image: SpeedReadingUk4 },
      { id: 5, name: 'Ерудит', image: SpeedReadingUk5 },
      { id: 6, name: 'Профі', image: SpeedReadingUk6 },
      { id: 7, name: 'Повний курс', image: SpeedReadingUk }
    ]
  },
  {
    id: 6,
    name: 'Speed Reading + Speech Therapy',
    levels: [
      { id: 1, name: 'Джуніор', image: SpeedReadingSpeechTherapyUk1 },
      { id: 2, name: 'Базовий', image: SpeedReadingSpeechTherapyUk2 },
      // { id: 3, name: 'Основний', image: SpeedReadingSpeechTherapyUk3 },
      { id: 4, name: 'Просунутий', image: SpeedReadingSpeechTherapyUk4 },
      { id: 5, name: 'Ерудит', image: SpeedReadingSpeechTherapyUk5 },
      { id: 6, name: 'Профі', image: SpeedReadingSpeechTherapyUk6 },
      { id: 7, name: 'Повний курс', image: SpeedReadingSpeechTherapyUk },
    ]
  },
  { id: 7, name: 'IT Gelios Start', levels: [{ id: 1, name: 'Повний курс', image: itGeliosStartEn }] }
];

const englishDirectionLevels = [
  { id: 1, name: 'Speech Therapy', levels: [{ id: 1, name: 'Basic', image: SpeechTherapyEn }] },
  {
    id: 2,
    name: 'Mental Arithmetic',
    levels: [
      { id: 1, name: 'Junior', image: MentalArithmeticEn1 },
      { id: 2, name: 'Basic', image: MentalArithmeticEn2 },
      { id: 3, name: 'Elementary', image: MentalArithmeticEn3 },
      { id: 4, name: 'Advanced', image: MentalArithmeticEn4 },
      { id: 5, name: 'Full Course', image: MentalArithmeticEn }
    ]
  },
  { id: 3, name: 'Multiplication and Division', levels: [{ id: 1, name: 'Basic', image: MultiplicationandDivisionUkr }] },
  { id: 4, name: 'School Preparation', levels: [{ id: 1, name: 'Basic', image: SchooolPreparationEn }] },
  {
    id: 5,
    name: 'Speed Reading',
    levels: [
      { id: 1, name: 'Junior', image: SpeedReadingEn1 },
      { id: 2, name: 'Basic', image: SpeedReadingEn2 },
      { id: 3, name: 'Elementary', image: SpeedReadingEn3 },
      { id: 4, name: 'Advanced', image: SpeedReadingEn4 },
      { id: 5, name: 'Erudite', image: SpeedReadingEn5 },
      { id: 6, name: 'Pro', image: SpeedReadingEn6 },
      { id: 7, name: 'Full Course', image: SpeedReadingEn }
    ]
  },
  {
    id: 6,
    name: 'Speed Reading + Speech Therapy',
    levels: [
      { id: 1, name: 'Junior', image: SpeedReadingSpeechTherapyEn1 },
      { id: 2, name: 'Basic', image: SpeedReadingSpeechTherapyEn2 },
      // { id: 3, name: 'Elementary', image: SpeedReadingSpeechTherapyEn3 },
      { id: 4, name: 'Advanced', image: SpeedReadingSpeechTherapyEn4 },
      { id: 5, name: 'Erudite', image: SpeedReadingSpeechTherapyEn5 },
      { id: 6, name: 'Pro', image: SpeedReadingSpeechTherapyEn6 },
      { id: 7, name: 'Full Course', image: SpeedReadingSpeechTherapyEn },
    ]
  },
  { id: 7, name: 'IT Gelios Start', levels: [{ id: 1, name: 'Basic', image: itGeliosStartEn }] }
];

const levels = reactive([] as { id: number; name: string; image: string }[]);

const languages = [
  { id: 'uk', name: 'Українська' },
  { id: 'en', name: 'English' }
];

const students = [
  { id: 1, name: 'Олег Петренко' },
  { id: 2, name: 'Марія Іван Arctic' },
  { id: 3, name: 'Іван Коваленко' },
  { id: 4, name: 'Анна Сидоренко' },
  { id: 5, name: 'Павло Шевченко' },
  { id: 6, name: 'Софія Грищенко' },
  { id: 7, name: 'Михайло Лисенко' },
  { id: 8, name: 'Олена Кравець' },
  { id: 9, name: 'Дмитро Ткаченко' },
  { id: 10, name: 'Юлія Бондаренко' },
  { id: 11, name: 'Артем Мельник' },
  { id: 12, name: 'Катерина Зайцева' },
  { id: 13, name: 'Василь Поліщук' },
  { id: 14, name: 'Наталія Козак' },
  { id: 15, name: 'Сергій Романенко' },
  { id: 16, name: 'Аліна Шевчук' },
  { id: 17, name: 'Олександр Кравченко' },
  { id: 18, name: 'Вікторія Дубровська' },
  { id: 19, name: 'Максим Гончар' },
  { id: 20, name: 'Тетяна Литвин' },
  { id: 21, name: 'Роман Скрипка' },
  { id: 22, name: 'Ірина Власенко' },
  { id: 23, name: 'Богдан Марчук' },
  { id: 24, name: 'Оксана Левченко' },
  { id: 25, name: 'Андрій Дорошенко' },
  { id: 26, name: 'Людмила Савчук' },
  { id: 27, name: 'Володимир Гнатюк' },
  { id: 28, name: 'Єлизавета Соколова' },
  { id: 29, name: 'Денис Bілоус' },
  { id: 30, name: 'Світлана Кравець' },
  { id: 31, name: 'Ярослав Олійник' },
  { id: 32, name: 'Христина Підлісецька' },
  { id: 33, name: 'Євгеній Коваленко' },
  { id: 34, name: 'Валерія Степаненко' },
  { id: 35, name: 'Зоряна Михайлюк' },
  { id: 36, name: 'Назар Вовк' },
  { id: 37, name: 'Дарина Пономаренко' },
  { id: 38, name: 'Орест Клименко' },
  { id: 39, name: 'Мирослава Гаврилюк' },
  { id: 40, name: 'Тарас Довгаль' },
  { id: 41, name: 'Лілія Сеньків' },
  { id: 42, name: 'Ігор Яворський' },
  { id: 43, name: 'Ангеліна Романів' },
  { id: 44, name: 'Святослав Кушнір' },
  { id: 45, name: 'Марта Лозинська' },
  { id: 46, name: 'Віталій Семенюк' },
  { id: 47, name: 'Олеся Турчин' },
  { id: 48, name: 'Ростислав Зварич' },
  { id: 49, name: 'Соломія Данилюк' },
  { id: 50, name: 'Юрій Остапчук' }
];

const currentStep = reactive({ value: 1 });
const steps = [
  { id: 1, name: 'Вибір напрямку, рівня, мови та учнів' },
  { id: 2, name: 'Ваш вибір' },
  { id: 3, name: 'Сертифікати додані' }
];

const selectedDirection = reactive({ value: null as number | null });
const selectedLevel = reactive({ value: [] as number[] });
const selectedLanguage = reactive({ value: null as string | null });
const selectedStudents = reactive({ value: [] as number[] });

const emit = defineEmits(['has-unsaved-changes']);

const isFormValid = computed(() => {
  return (
      selectedDirection.value !== null &&
      selectedLevel.value.length > 0 &&
      selectedLanguage.value !== null &&
      selectedStudents.value.length > 0
  );
});

const hasUnsavedChanges = computed(() => {
  return (
      selectedDirection.value !== null ||
      selectedLevel.value.length > 0 ||
      selectedLanguage.value !== null ||
      selectedStudents.value.length > 0
  );
});

watch(
    [() => selectedDirection.value, () => selectedLanguage.value],
    ([newDirection, newLanguage]) => {
      console.log('Direction changed to:', newDirection, 'Language changed to:', newLanguage);
      levels.splice(0, levels.length);
      if (newDirection !== null) {
        const source = newLanguage === 'en' ? englishDirectionLevels : ukrainianDirectionLevels;
        const direction = source.find(d => d.id === newDirection);
        if (direction) {
          levels.push(...direction.levels);
        }
      }
      console.log('Updated levels:', JSON.stringify(levels, null, 2));
      selectedLevel.value = selectedLevel.value.filter(levelId =>
          levels.some(level => level.id === levelId)
      );
    },
    { immediate: true }
);

watch(hasUnsavedChanges, (value) => {
  emit('has-unsaved-changes', value);
});

const nextStep = () => {
  console.log('Selected Levels before moving to step 2:', selectedLevel.value);
  console.log('Selected Language before moving to step 2:', selectedLanguage.value);
  if (isFormValid.value && currentStep.value < steps.length - 1) {
    currentStep.value++;
    console.log('Proceeding to next step:', {
      step: currentStep.value,
      direction: selectedDirection.value,
      level: selectedLevel.value,
      language: selectedLanguage.value,
      students: selectedStudents.value
    });
  } else {
    console.log('Form is invalid:', {
      direction: selectedDirection.value,
      level: selectedLevel.value,
      language: selectedLanguage.value,
      students: selectedStudents.value
    });
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const resetForm = () => {
  selectedDirection.value = null;
  selectedLevel.value = [];
  selectedLanguage.value = null;
  selectedStudents.value = [];
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}\n${year}`;
};

const generateCertificate = async (
    studentName: string,
    levelId: number,
    levelName: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const level = levels.find((l) => l.id === levelId);
    if (!level) {
      console.error('Level not found for ID:', levelId);
      reject(new Error('Level not found'));
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = level.image;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('Failed to get canvas context');
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0);

      const marckScriptFont = new FontFace('MarckScript', `url(${MarckScriptFont})`);
      const nunitoFont = new FontFace('Nunito', `url(${NunitoFont})`);

      Promise.all([marckScriptFont.load(), nunitoFont.load()])
          .then(([loadedMarckScript, loadedNunito]) => {
            document.fonts.add(loadedMarckScript);
            document.fonts.add(loadedNunito);

            // Set text styles for student name
            ctx.font = 'italic bold 100px MarckScript, sans-serif';
            ctx.fillStyle = '#800080';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Draw student name
            const x = canvas.width / 2 + 500;
            const y = canvas.height / 2 - 15;
            ctx.fillText(studentName, x, y);

            // Set text styles for date (white and bold)
            ctx.font = 'bold 55px Nunito, sans-serif'; // Changed to bold
            ctx.fillStyle = '#FFFFFF'; // Changed to white
            ctx.textAlign = 'right';
            ctx.textBaseline = 'bottom';

            // Draw current date
            const currentDate = new Date('2025-06-26');
            const dateText = formatDate(currentDate);
            const dateLines = dateText.split('\n');
            const dateX = canvas.width - 480;
            const dateY = canvas.height - 235;
            ctx.fillText(dateLines[0], dateX, dateY - 65);
            ctx.fillText(dateLines[1], dateX, dateY);

            const pdf = new jsPDF({
              orientation: img.width > img.height ? 'landscape' : 'portrait',
              unit: 'px',
              format: [img.width, img.height]
            });

            pdf.addFont(MarckScriptFont, 'MarckScript', 'normal');
            pdf.addFont(NunitoFont, 'Nunito', 'normal');
            pdf.setFont('MarckScript');

            const dataUrl = canvas.toDataURL('image/png');
            pdf.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height);

            const fileName = `Certificate_${studentName}_${levelName}.pdf`;
            pdf.save(fileName);

            resolve();
          })
          .catch((error) => {
            console.error('Failed to load custom fonts:', error);
            reject(new Error('Failed to load custom fonts'));
          });
    };

    img.onerror = () => {
      console.error('Failed to load image:', level.image);
      reject(new Error('Failed to load image'));
    };
  });
};

const addCertificates = async () => {
  console.log('Form state:', {
    direction: selectedDirection.value,
    level: selectedLevel.value,
    language: selectedLanguage.value,
    students: selectedStudents.value
  });

  if (isFormValid.value) {
    try {
      for (const studentId of selectedStudents.value) {
        const student = students.find((s) => s.id === studentId);
        if (!student) continue;

        for (const levelId of selectedLevel.value) {
          const level = levels.find((l) => l.id === levelId);
          if (!level) continue;

          await generateCertificate(student.name, levelId, level.name);
        }
      }

      currentStep.value = 3;
      console.log('Certificates added:', {
        direction: selectedDirection.value,
        level: selectedLevel.value,
        language: selectedLanguage.value,
        students: selectedStudents.value
      });

      setTimeout(resetForm, 2000);
    } catch (error) {
      console.error('Error generating certificates:', error);
    }
  } else {
    console.log('Form is invalid');
  }
};
</script>

<template>
  <div class="certificate-form">
    <div class="certificate-form__header" v-if="currentStep.value > 1">
      <span class="certificate-form__back-arrow" @click="prevStep">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M15 10H5M5 10L10 5M5 10L10 15"
              stroke="#0066FF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
      </span>
      <h1 class="certificate-form__header-title">{{ steps[currentStep.value - 1].name }}</h1>
    </div>

    <div v-if="currentStep.value === 1" class="certificate-form__content">
      <StudentSelector
          :items="ukrainianDirectionLevels"
          v-model="selectedDirection.value"
          title="Напрямок"
          search-placeholder="Шукати напрямок"
          no-items-text="Напрямків не знайдено"
          :single-select="true"
          :is-visible-search="false"
          :show-checkbox="false"
      />
      <StudentSelector
          :items="levels"
          v-model="selectedLevel.value"
          title="Рівень"
          search-placeholder="Шукати рівень"
          no-items-text="Рівнів не знайдено"
          :single-select="false"
          select-all-text="Вибрати всі рівні"
      />
      <StudentSelector
          :items="students"
          v-model="selectedStudents.value"
          title="Мої учні"
          search-placeholder="Шукати учня"
          no-items-text="Учнів не знайдено"
          select-all-text="Вибрати всіх"
      />
      <LanguageSelector
          style="margin-top: -160px"
          :items="languages"
          v-model="selectedLanguage.value"
          title="Мова"
          no-items-text="Мови не знайдено"
      />
    </div>

    <div v-if="currentStep.value === 2" class="certificate-form__content step-confirmation">
      <div class="confirmation-step">
        <SelectedDirection :directions="ukrainianDirectionLevels" v-model="selectedDirection.value" />
        <div class="confirmation-item">
          <strong>Мова сертифіката</strong>
          <span>{{ languages.find(l => l.id === selectedLanguage.value)?.name || 'Мова не вибрана' }}</span>
        </div>
        <SelectedLevelCertification :levels="levels" v-model="selectedLevel.value" />
        <SelectedStudentsCertification :students="students" v-model="selectedStudents.value" />
      </div>
    </div>

    <div v-if="currentStep.value === 3" class="certificate-form__content step-success">
      <div class="success-step">
        <img :src="successImage" alt="Success" class="success-image" />
        <h2 class="success-title">Сертифікати успішно додані</h2>
      </div>
    </div>

    <div class="button-group" v-if="currentStep.value < 3">
      <button v-if="currentStep.value === 2" class="rounded-button button large-button" @click="prevStep">
        <span class="arrow-left"></span>
        Назад
      </button>
      <button
          class="button large-button next-button"
          :disabled="!isFormValid"
          @click="currentStep.value === 1 ? nextStep() : addCertificates()"
      >
        {{ currentStep.value === 1 ? 'Далі' : 'Додати' }}
        <span class="arrow-right" v-if="currentStep.value === 1"></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.certificate-form {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.certificate-form__header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.certificate-form__back-arrow {
  cursor: pointer;
  margin-right: 12px;
}

.certificate-form__header-title {
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 32px;
  color: #000;
}

.certificate-form__content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  margin-bottom: 20px;
}

.step-confirmation,
.step-success {
  grid-column: 1 / 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.confirmation-step,
.success-step {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.confirmation-step h2,
.success-step h2 {
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #000;
  text-align: center;
}

.confirmation-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background-color: #e3ecf5;
  border-radius: 12px;
}

.confirmation-item strong {
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #333;
}

.confirmation-item span {
  font-family: 'Onest', sans-serif;
  font-size: 16px;
  color: #333;
}

.level-option {
  display: flex;
  align-items: center;
  gap: 13px;
}

.level-image {
  width: 60px;
  height: 40px;
  object-fit: contain;
  border-radius: 4px;
}

.success-image {
  width: 633px;
  height: 350px;
  object-fit: contain;
  margin: 0 auto;
  margin-bottom: 16px;
}

.success-title {
  font-family: Onest;
  font-weight: 500;
  font-size: 48px;
  line-height: 120%;
  letter-spacing: -2%;
  text-align: center;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  grid-column: 1 / 4;
  margin-top: 20px;
}

.next-button {
  background: #0066FF;
  color: white;
}

.next-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.next-button:hover:not(:disabled) {
  background: #0056b3;
}

.back-button {
  background: #ffffff;
  color: #0066FF;
  border: 1.5px solid #0066FF;
}

.back-button:hover {
  background: #f0f0f0;
}
</style>