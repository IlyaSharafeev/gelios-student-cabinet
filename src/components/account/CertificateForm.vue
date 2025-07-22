<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
import { useCertificatesStore } from '@/stores/certificates';
import { storeToRefs } from 'pinia';
// jsPDF, NunitoFont, MarckScriptFont больше не нужны здесь напрямую
// import { jsPDF } from 'jspdf';
// import NunitoFont from '@/assets/fonts/Nunito-VariableFont_wght.ttf';
// import MarckScriptFont from '@/assets/fonts/MarckScript-Regular.ttf';

// --- Импорт нового компонента модального окна ---
import ImageViewerModal from '@/components/modal/PdfViewerModal.vue'; // Обновленный путь и имя

// --- Импорт всех изображений для сертификатов ---
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
import SpeedReadingSpeechTherapyUk4 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 4.png";
import SpeedReadingSpeechTherapyUk5 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 5.png";
import SpeedReadingSpeechTherapyUk6 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 6.png";
import SpeedReadingSpeechTherapyUk from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія.png";

// --- Карта изображений для сопоставления ---
const imageMap: Record<string, string> = {
  itGeliosStartEn, SchooolPreparationEn, SpeechTherapyEn, MentalArithmeticEn, MentalArithmeticEn1, MentalArithmeticEn2, MentalArithmeticEn3, MentalArithmeticEn4,
  MultiplicationandDivisionEn, SpeedReadingEn, SpeedReadingEn1, SpeedReadingEn2, SpeedReadingEn3, SpeedReadingEn4, SpeedReadingEn5, SpeedReadingEn6,
  SpeedReadingSpeechTherapyEn, SpeedReadingSpeechTherapyEn1, SpeedReadingSpeechTherapyEn2, SpeedReadingSpeechTherapyEn3, SpeedReadingSpeechTherapyEn4,
  SpeedReadingSpeechTherapyEn5, SpeedReadingSpeechTherapyEn6, itGeliosStartUk, SpeechTherapyUk, MentalArithmeticUk, MentalArithmeticUk1, MentalArithmeticUk2,
  MentalArithmeticUk3, MentalArithmeticUk4, MultiplicationandDivisionUkr, SpeedReadingUk, SpeedReadingUk1, SpeedReadingUk2, SpeedReadingUk3, SpeedReadingUk4,
  SpeedReadingUk5, SpeedReadingUk6, SpeedReadingSpeechTherapyUk, SpeedReadingSpeechTherapyUk1, SpeedReadingSpeechTherapyUk2,
  SpeedReadingSpeechTherapyUk4, SpeedReadingSpeechTherapyUk5, SpeedReadingSpeechTherapyUk6, SchooolPreparationEn
};

const getCertificateImagePath = (imageNameFromBackend: string): string | undefined => {
  if (!imageNameFromBackend) {
    console.error(`[getCertificateImagePath] ОШИБКА: Имя изображения с бэкенда пустое или некорректное.`);
    return undefined;
  }

  console.log(`[getCertificateImagePath] Запрос для ключа: "${imageNameFromBackend}"`);
  const path = imageMap[imageNameFromBackend];
  if (path) {
    console.log(`[getCertificateImagePath] Найден путь для "${imageNameFromBackend}": ${path}`);
  } else {
    console.error(`[getCertificateImagePath] ОШИБКА: Изображение с ключом "${imageNameFromBackend}" НЕ НАЙДЕНО в imageMap.`);
    console.log("[getCertificateImagePath] Доступные ключи в imageMap:", Object.keys(imageMap));
  }
  return path;
};


const certificatesStore = useCertificatesStore();
const { getStudentCertificates: studentCertificates, loading, error } = storeToRefs(certificatesStore);

onMounted(() => {
  console.log('CertificateForm: Компонент смонтирован, запускаю fetchStudentCertificates.');
  certificatesStore.fetchStudentCertificates();
});

watch([studentCertificates, loading, error], ([newCertificates, newLoading, newError]) => {
  console.log('CertificateForm: Состояние store изменилось.');
  console.log('  studentCertificates (новое значение):', newCertificates);
  console.log('  loading (новое значение):', newLoading);
  console.log('  error (новое значение):', newError);

  if (newLoading) {
    console.log('CertificateForm: Текущее состояние - Загрузка.');
  } else if (newError) {
    console.log('CertificateForm: Текущее состояние - Ошибка:', newError);
  } else if (!newCertificates || newCertificates.length === 0) {
    console.log('CertificateForm: Загрузка завершена, нет ошибок, но studentCertificates пуст или не определен.');
  } else if (newCertificates.length > 0) {
    console.log('CertificateForm: Сертификаты загружены и готовы к отображению.');
    newCertificates.forEach((studentData: any) => {
      console.log(`CertificateForm: Обработка сертификатов для студента: ${studentData.first_name} ${studentData.last_name}`);
      if (studentData.certificates && studentData.certificates.length > 0) {
        studentData.certificates.forEach((cert: any) => {
          console.log(`CertificateForm: -> Сертификат ID: ${cert.id}, image: "${cert.image}"`);
          if (typeof cert.id !== 'number' || isNaN(cert.id)) {
            console.error(`CertificateForm: КЛЮЧЕВАЯ ОШИБКА: certificate.id не является числом или NaN для сертификата:`, cert);
          }

          const imagePath = getCertificateImagePath(cert.image);
          if (imagePath) {
            console.log(`CertificateForm: Изображение для "${cert.image}" будет рендериться.`);
          } else {
            console.error(`CertificateForm: Изображение для "${cert.image}" НЕ БУДЕТ рендериться из-за отсутствия пути.`);
          }
        });
      } else {
        console.log(`CertificateForm: У студента ${studentData.first_name} ${studentData.last_name} нет сертификатов в массиве.`);
      }
    });
  }
}, { deep: true, immediate: true });

// Функция для определения классов карточек
const getCertificateCardClass = (certificate: any) => {
  const classes: string[] = [];
  switch (certificate.level_name) {
    case 'Джуніор':
      classes.push('level-junior');
      break;
    case 'Базовий':
      classes.push('level-basic');
      break;
    case 'Основний':
      classes.push('level-main');
      break;
    case 'Просунутий':
      classes.push('level-advanced');
      break;
    case 'Повний курс':
      if (certificate.id === 5) { // ID для "IT Gelios Start"
        classes.push('level-full-course');
      } else {
        classes.push('level-full-course-orange');
      }
      break;
    case 'Прямий рахунок':
      classes.push('level-direct-account');
      break;
    case 'Молоді друзі':
      classes.push('level-young-friends');
      break;
    case 'Старші друзі':
      classes.push('level-old-friends');
      break;
    case 'Комбінації':
      classes.push('level-combinations');
      break;
    case 'Ерудит':
      classes.push('level-erudit');
      break;
    case 'Профі':
      classes.push('level-profi');
      break;
    default:
      break;
  }

  if (certificate.is_locked) {
    classes.push('locked');
  }
  return classes;
};

// --- СОСТОЯНИЕ ДЛЯ МОДАЛЬНОГО ОКНА ---
const showImageViewerModal = ref(false);
const currentImageUrl = ref<string | null>(null);
const currentCertificateData = ref<any>(null); // Передаем весь объект сертификата
const currentStudentName = ref(''); // Имя студента

const openImageViewerModal = (imageUrl: string, certificate: any, studentName: string) => {
  currentImageUrl.value = imageUrl;
  currentCertificateData.value = certificate;
  currentStudentName.value = studentName;
  showImageViewerModal.value = true;
};

const closeImageViewerModal = () => {
  showImageViewerModal.value = false;
  currentImageUrl.value = null;
  currentCertificateData.value = null;
  currentStudentName.value = '';
};

// --- Функция для показа изображения в модалке (БЕЗ ГЕНЕРАЦИИ PDF ЗДЕСЬ) ---
const showCertificateImageInModal = async (certificate: any, studentName: string): Promise<void> => {
  const imagePath = getCertificateImagePath(certificate.image);
  if (!imagePath) {
    console.error(`Изображение для сертификата "${certificate.image}" не найдено.`);
    return;
  }

  // Открываем модальное окно с URL изображения и передаем ПОЛНЫЕ ДАННЫЕ сертификата и имя студента
  openImageViewerModal(imagePath, certificate, studentName);
};

</script>

<template>
  <div class="certificate-form">
    <div class="certificate-header">
      <div class="dropdown">
        <label for="filter-certificates">Вибрати предмет</label>
        <select id="filter-certificates">
          <option value="all">Всі</option>
          <option value="completed">Завершено</option>
          <option value="in-progress">В процесі</option>
        </select>
        <span class="dropdown-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="#5F6D7E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
      <button class="filter-button active">Всі</button>
      <button class="filter-button">Відкриті</button>
      <button class="filter-button">Закриті</button>
    </div>

    <div v-if="loading" class="loading-message">Загрузка сертификатов...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else-if="!studentCertificates || studentCertificates.length === 0" class="no-certificates-message">
      Сертификаты не найдены.
    </div>
    <div v-else class="certificates-grid">
      <template v-for="(studentData, studentIndex) in studentCertificates" :key="studentData.first_name + studentData.last_name + studentIndex">
        <div
            v-for="(certificate, certIndex) in studentData.certificates"
            :key="certificate.id !== undefined && certificate.id !== null && !isNaN(certificate.id) ? certificate.id : `${studentData.first_name}-${studentData.last_name}-cert-${certIndex}`"
            class="certificate-card"
            :class="getCertificateCardClass(certificate)"
            @click="showCertificateImageInModal(certificate, `${studentData.first_name} ${studentData.last_name}`)" >
          <div class="certificate-image">
            <img :src="getCertificateImagePath(certificate.image)" alt="Certificate Icon" v-if="getCertificateImagePath(certificate.image)">
            <p v-else>Изображение не найдено</p>
            <i v-if="certificate.is_locked" class="lock-icon material-icons">lock</i>
          </div>
          <div class="certificate-title">
            {{ certificate.level_name }}
          </div>
        </div>
      </template>
    </div>

    <ImageViewerModal
        :image-url="currentImageUrl"
        :show-modal="showImageViewerModal"
        :certificate-data="currentCertificateData"
        :student-name="currentStudentName"
        @close="closeImageViewerModal"
    />
  </div>
</template>

<style scoped lang="scss">
.certificate-form {
  padding: 20px;
}

.certificate-header {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .dropdown {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: #F0F0F0;
    padding: 8px 15px;
    border-radius: 12px;
    position: relative;
    cursor: pointer;

    label {
      font-weight: 500;
      color: #5F6D7E;
    }

    select {
      background: none;
      border: none;
      font-size: 16px;
      font-family: 'Onest', sans-serif;
      font-weight: 600;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      padding-right: 25px;
      cursor: pointer;
      outline: none;
    }

    .dropdown-arrow {
      position: absolute;
      right: 15px;
      pointer-events: none;
    }
  }

  .filter-button {
    padding: 8px 16px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    transition: background-color 0.2s ease, color 0.2s ease;

    &.active {
      background-color: #0066FF;
      color: white;
    }

    &:not(.active) {
      background-color: #F0F0F0;
      color: #5F6D7E;
    }

    &:hover:not(.active) {
      background-color: #e0e0e0;
    }
  }
}

.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 15px;
  padding-top: 20px;

  .certificate-card {
    background-color: #F8F8FC;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    text-align: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease;
    height: 180px;
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.12);
    }

    // --- Стили для фоновых цветов в зависимости от level_name ---
    &.level-junior {
      background-color: #FCE4EC;
    }
    &.level-basic {
      background-color: #EDE7F6;
    }
    &.level-main {
      background-color: #E3F2FD;
    }
    &.level-advanced {
      background-color: #FFF3E0;
    }
    &.level-erudit {
      background-color: #E0F2F7;
    }
    &.level-profi {
      background-color: #F3E5F5;
    }
    &.level-full-course { // Фиолетовый "Повний курс"
      background-color: #EDE7F6;
    }
    &.level-direct-account { // Прямий рахунок - оранжевый
      background-color: #FFF3E0;
    }
    &.level-young-friends { // Молоді друзі - розовый
      background-color: #FCE4EC;
    }
    &.level-old-friends { // Старші друзі - голубой
      background-color: #E3F2FD;
    }
    &.level-combinations { // Комбінації - оранжевый
      background-color: #FFF3E0;
    }
    &.level-full-course-orange { // Отдельный оранжевый "Повний курс"
      background-color: #FFE0B2;
    }


    // Стили для заблокированных карточек
    &.locked {
      background-color: #CFD8DC;
      opacity: 0.8;
      cursor: not-allowed;
      .certificate-image {
        filter: grayscale(100%);
        opacity: 0.6;
      }
      .lock-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #546E7A;
        font-size: 3em;
        z-index: 10;
      }
    }
  }

  .certificate-image {
    width: 100%;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;

    img {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      border-radius: 8px;
    }
    p {
      font-size: 12px;
      color: #999;
    }
  }

  .certificate-title {
    font-weight: 500;
    font-size: 14px;
    color: #333;
    margin-top: auto;
    margin-bottom: 0;
    padding: 0 5px 10px;
    text-align: center;
    line-height: 1.2;
  }

  .certificate-date {
    display: none;
  }
}

.loading-message,
.error-message,
.no-certificates-message {
  text-align: center;
  font-size: 18px;
  color: #5F6D7E;
  margin-top: 50px;
}

.error-message {
  color: #D32F2F;
}
</style>