<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useCertificatesStore } from '@/stores/certificates';
import { storeToRefs } from 'pinia';

// --- Импорт всех изображений для сертификатов ---
// Эти пути остаются, как они есть у вас на диске
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
// СДЕЛАНО ТОЧНО ТАК ЖЕ, КАК В AddSertificateForm.vue
const imageMap: Record<string, string> = {
  itGeliosStartEn, SpeechTherapyEn, MentalArithmeticEn, MentalArithmeticEn1, MentalArithmeticEn2, MentalArithmeticEn3, MentalArithmeticEn4,
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
  const path = imageMap[imageNameFromBackend]; // Теперь path будет импортированным URL (например, "/src/assets/...")
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
</script>

<template>
  <div class="certificate-form">
    <div class="certificate-header">
      <div class="dropdown">
        <label for="filter-certificates">Всі</label>
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
        >
          <div class="certificate-image">
            <img :src="getCertificateImagePath(certificate.image)" alt="Certificate Icon" v-if="getCertificateImagePath(certificate.image)">
            <p v-else>Изображение не найдено</p>
          </div>
          <div class="certificate-title">
            {{ certificate.direction_name }} - {{ certificate.level_name }}
          </div>
          <p class="certificate-date">
            Выдан: {{ new Date(certificate.created_at).toLocaleDateString('uk-UA') }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Стили остаются без изменений */
.certificate-form {
  padding: 20px;
}

.certificate-header {
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-start;

  .dropdown {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: #F0F0F0;
    padding: 8px 15px;
    border-radius: 12px;
    position: relative;

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
}

.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;

  .certificate-card {
    background-color: #F8F8FC;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    height: 220px;
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-5px);
    }

    .certificate-image {
      width: 100%;
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;

      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        border-radius: 8px;
      }
      p {
        font-size: 12px;
        color: #999;
      }
    }

    .certificate-title {
      font-weight: 600;
      font-size: 14px;
      color: #333;
    }

    .certificate-date {
      font-size: 12px;
      color: #777;
      margin-top: 5px;
    }
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