<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useCertificatesStore } from '@/stores/certificates';
import { storeToRefs } from 'pinia';
import { jsPDF } from 'jspdf'; // Импорт jspdf

// --- Импорт шрифтов (скопировано из AddSertificateForm.vue) ---
import NunitoFont from '@/assets/fonts/Nunito-VariableFont_wght.ttf';
import MarckScriptFont from '@/assets/fonts/MarckScript-Regular.ttf';

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
const { getStudentCertificates: studentCertificates, loading, error } = storeToRefs(certificatesStore); //

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
  // Добавление класса для фона в зависимости от уровня
  // Вам нужно будет адаптировать эту логику под ваши конкретные уровни/направления
  // и цвета, если они не являются фиксированными строками, как здесь.
  switch (certificate.level_name) {
    case 'Джуніор': // Пример из скриншота
      classes.push('level-junior');
      break;
    case 'Базовий': // Пример из скриншота
      classes.push('level-basic');
      break;
    case 'Основний': // Пример из скриншота
      classes.push('level-main');
      break;
    case 'Просунутий': // Пример из скриншота
      classes.push('level-advanced');
      break;
    case 'Повний курс': // Пример из скриншота
      // Может быть оранжевый или фиолетовый, как на скриншоте. Определитесь с логикой.
      // Если "Повний курс" может быть разных цветов, нужно дополнительное поле в данных
      // Здесь предполагаем, что сертификат с ID 5 (IT Gelios Start) имеет фиолетовый фон
      // А другой "Повний курс" (если такой будет) будет оранжевым, или нужен признак с бэкенда
      if (certificate.id === 5) { // ID для "IT Gelios Start"
        classes.push('level-full-course'); // Фиолетовый
      } else {
        classes.push('level-full-course-orange'); // Оранжевый (если по умолчанию)
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
      // classes.push('level-default');
      break;
  }

  // Если есть поле is_locked в данных сертификата (пример)
  // В AddSertificateForm.vue нет такого поля в Certificates, вам нужно, чтобы бэкенд его предоставлял
  if (certificate.is_locked) {
    classes.push('locked');
  }
  return classes;
};

// --- Функция для форматирования даты (скопировано из AddSertificateForm.vue) ---
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}\n${year}`;
};

// --- Функция генерации PDF (скопировано из AddSertificateForm.vue) ---
// Принимает объект сертификата, чтобы получить его изображение и данные
const generateCertificatePdf = async (certificate: any, studentName: string): Promise<void> => {
  if (!certificate || !certificate.image) {
    const errorMsg = `Недостаточно данных для генерации PDF сертификата: ${certificate?.id || 'N/A'}`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const imagePath = getCertificateImagePath(certificate.image); // Получаем путь к изображению
  if (!imagePath) {
    const errorMsg = `Изображение для сертификата "${certificate.image}" не найдено в imageMap.`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Важно для загрузки изображений с других доменов (если применимо)
    img.src = imagePath; // Используем найденный путь к изображению

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Failed to get canvas context'));

      ctx.drawImage(img, 0, 0);

      const marckScriptFont = new FontFace('MarckScript', `url(${MarckScriptFont})`);
      const nunitoFont = new FontFace('Nunito', `url(${NunitoFont})`);

      Promise.all([marckScriptFont.load(), nunitoFont.load()]).then(([loadedMarckScript, loadedNunito]) => {
        document.fonts.add(loadedMarckScript);
        document.fonts.add(loadedNunito);

        // Настройки текста имени студента (адаптируйте координаты и стили)
        ctx.font = 'italic bold 100px MarckScript, sans-serif';
        ctx.fillStyle = '#800080'; // Фиолетовый цвет
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(studentName, canvas.width / 2 + 500, canvas.height / 2 - 15); // Координаты из AddSertificateForm.vue

        // Настройки текста даты (адаптируйте координаты и стили)
        ctx.font = 'bold 55px Nunito, sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        const certificateDate = new Date(certificate.created_at); // Используем дату из сертификата
        const dateText = formatDate(certificateDate);
        const dateLines = dateText.split('\n');
        const dateX = canvas.width - 480; // Координаты из AddSertificateForm.vue
        const dateY = canvas.height - 235; // Координаты из AddSertificateForm.vue
        ctx.fillText(dateLines[0], dateX, dateY - 65);
        ctx.fillText(dateLines[1], dateX, dateY);

        const pdf = new jsPDF({
          orientation: img.width > img.height ? 'landscape' : 'portrait',
          unit: 'px',
          format: [img.width, img.height]
        });

        pdf.addFont(MarckScriptFont, 'MarckScript', 'normal');
        pdf.addFont(NunitoFont, 'Nunito', 'normal');
        pdf.setFont('MarckScript'); // Устанавливаем шрифт по умолчанию для PDF
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, img.width, img.height);
        pdf.save(`Certificate_${studentName}_${certificate.direction_name}_${certificate.level_name}.pdf`); // Используем данные сертификата для имени файла
        resolve();
      }).catch(reject);
    };
    img.onerror = () => reject(new Error(`Failed to load image for PDF: ${imagePath}`));
  });
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
            @click="generateCertificatePdf(certificate, `${studentData.first_name} ${studentData.last_name}`)" >
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
    // Убедитесь, что `certificate.level_name` соответствует этим строкам
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