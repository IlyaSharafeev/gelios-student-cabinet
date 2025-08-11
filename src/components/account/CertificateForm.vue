<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useCertificatesStore } from '@/stores/certificates';
import { storeToRefs } from 'pinia';
import ImageViewerModal from '@/components/modal/PdfViewerModal.vue';

// --- Импорты изображений на основе JSON ---
import SpeechTherapyUk from "@/assets/backgrounds/certificate-level-uk/Логопедія.png";
import MentalArithmeticUk1 from "@/assets/backgrounds/certificate-level-uk/Ментальна арифметика - 1.png";
import MentalArithmeticUk2 from "@/assets/backgrounds/certificate-level-uk/Ментальна арифметика - 2.png";
import MentalArithmeticUk3 from "@/assets/backgrounds/certificate-level-uk/Ментальна арифметика - 3.png";
import MentalArithmeticUk4 from "@/assets/backgrounds/certificate-level-uk/Ментальна арифметика - 4.png";
import MentalArithmeticUk from "@/assets/backgrounds/certificate-level-uk/Ментальна арифметика.png";
import MultiplicationandDivisionUkr from "@/assets/backgrounds/certificate-level-uk/Множення і ділення.png";
import SchooolPreparationEn from "@/assets/backgrounds/certificate-level-en/Підготовка до школи.png";
import SpeedReadingUk1 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 1.png";
import SpeedReadingUk2 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 2.png";
import SpeedReadingUk3 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 3.png";
import SpeedReadingUk4 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 4.png";
import SpeedReadingUk5 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 5.png";
import SpeedReadingUk6 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 6.png";
import SpeedReadingUk from "@/assets/backgrounds/certificate-level-uk/Швидкочитання.png";
import SpeedReadingSpeechTherapyUk1 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 1.png";
import SpeedReadingSpeechTherapyUk2 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 2.png";
// import SpeedReadingSpeechTherapyUk3 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 3.png";
import SpeedReadingSpeechTherapyUk4 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 4.png";
import SpeedReadingSpeechTherapyUk5 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 5.png";
import SpeedReadingSpeechTherapyUk6 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 6.png";
import SpeedReadingSpeechTherapyUk from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія.png";
import itGeliosStartEn from "@/assets/backgrounds/certificate-level-en/IT Gelios Start.png";
import SpeechTherapyEn from "@/assets/backgrounds/certificate-level-en/Логопедія.png";
import MentalArithmeticEn1 from "@/assets/backgrounds/certificate-level-en/Ментальна арифметика - 1.png";
import MentalArithmeticEn2 from "@/assets/backgrounds/certificate-level-en/Ментальна арифметика - 2.png";
import MentalArithmeticEn3 from "@/assets/backgrounds/certificate-level-en/Ментальна арифметика - 3.png";
import MentalArithmeticEn4 from "@/assets/backgrounds/certificate-level-en/Ментальна арифметика - 4.png";
import MentalArithmeticEn from "@/assets/backgrounds/certificate-level-en/Ментальна арифметика.png";
import SpeedReadingEn1 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 1.png";
import SpeedReadingEn2 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 2.png";
import SpeedReadingEn3 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 3.png";
import SpeedReadingEn4 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 4.png";
import SpeedReadingEn5 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 5.png";
import SpeedReadingEn6 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 6.png";
import SpeedReadingEn from "@/assets/backgrounds/certificate-level-en/Швидкочитання.png";
import SpeedReadingSpeechTherapyEn1 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 1.png";
import SpeedReadingSpeechTherapyEn2 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 2.png";
import SpeedReadingSpeechTherapyEn3 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 3.png";
import SpeedReadingSpeechTherapyEn4 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 4.png";
import SpeedReadingSpeechTherapyEn5 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 5.png";
import SpeedReadingSpeechTherapyEn6 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 6.png";
import SpeedReadingSpeechTherapyEn from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія.png";

const masterCertificateList = [
  { id: 1, level_name: "Basic", image: "SpeechTherapyUk", category: 1, is_locked: true },
  { id: 2, level_name: "Джуніор", image: "MentalArithmeticUk1", category: 2, is_locked: true },
  { id: 3, level_name: "Базовий", image: "MentalArithmeticUk2", category: 2, is_locked: true },
  { id: 4, level_name: "Основний", image: "MentalArithmeticUk3", category: 2, is_locked: true },
  { id: 5, level_name: "Просунутий", image: "MentalArithmeticUk4", category: 2, is_locked: true },
  { id: 6, level_name: "Повний курс", image: "MentalArithmeticUk", category: 2, is_locked: true },
  { id: 7, level_name: "Повний курс", image: "MultiplicationandDivisionUkr", category: 3, is_locked: true },
  { id: 8, level_name: "Повний курс", image: "SchooolPreparationEn", category: 4, is_locked: true },
  { id: 9, level_name: "Джуніор", image: "SpeedReadingUk1", category: 5, is_locked: true },
  { id: 10, level_name: "Базовий", image: "SpeedReadingUk2", category: 5, is_locked: true },
  { id: 11, level_name: "Основний", image: "SpeedReadingUk3", category: 5, is_locked: true },
  { id: 12, level_name: "Просунутий", image: "SpeedReadingUk4", category: 5, is_locked: true },
  { id: 13, level_name: "Ерудит", image: "SpeedReadingUk5", category: 5, is_locked: true },
  { id: 14, level_name: "Профі", image: "SpeedReadingUk6", category: 5, is_locked: true },
  { id: 15, level_name: "Повний курс", image: "SpeedReadingUk", category: 5, is_locked: true },
  { id: 16, level_name: "Джуніор", image: "SpeedReadingSpeechTherapyUk1", category: 6, is_locked: true },
  { id: 17, level_name: "Базовий", image: "SpeedReadingSpeechTherapyUk2", category: 6, is_locked: true },
  // { id: 18, level_name: "Основний", image: "SpeedReadingSpeechTherapyUk3", category: 6, is_locked: true },
  { id: 19, level_name: "Просунутий", image: "SpeedReadsingSpeechTherapyUk4", category: 6, is_locked: true },
  { id: 20, level_name: "Ерудит", image: "SpeedReadingSpeechTherapyUk5", category: 6, is_locked: true },
  { id: 21, level_name: "Профі", image: "SpeedReadingSpeechTherapyUk6", category: 6, is_locked: true },
  { id: 22, level_name: "Повний курс", image: "SpeedReadingSpeechTherapyUk", category: 6, is_locked: true },
  { id: 23, level_name: "Повний курс", image: "itGeliosStartEn", category: 7, is_locked: true },
  { id: 24, level_name: "Basic", image: "SpeechTherapyEn", category: 8, is_locked: true },
  { id: 25, level_name: "Junior", image: "MentalArithmeticEn1", category: 9, is_locked: true },
  { id: 26, level_name: "Basic", image: "MentalArithmeticEn2", category: 9, is_locked: true },
  { id: 27, level_name: "Elementary", image: "MentalArithmeticEn3", category: 9, is_locked: true },
  { id: 28, level_name: "Advanced", image: "MentalArithmeticEn4", category: 9, is_locked: true },
  { id: 29, level_name: "Full Course", image: "MentalArithmeticEn", category: 9, is_locked: true },
  { id: 30, level_name: "Basic", image: "MultiplicationandDivisionUkr", category: 10, is_locked: true },
  { id: 31, level_name: "Basic", image: "SchooolPreparationEn", category: 11, is_locked: true },
  { id: 32, level_name: "Junior", image: "SpeedReadingEn1", category: 12, is_locked: true },
  { id: 33, level_name: "Basic", image: "SpeedReadingEn2", category: 12, is_locked: true },
  { id: 34, level_name: "Elementary", image: "SpeedReadingEn3", category: 12, is_locked: true },
  { id: 35, level_name: "Advanced", image: "SpeedReadingEn4", category: 12, is_locked: true },
  { id: 36, level_name: "Erudite", image: "SpeedReadingEn5", category: 12, is_locked: true },
  { id: 37, level_name: "Pro", image: "SpeedReadingEn6", category: 12, is_locked: true },
  { id: 38, level_name: "Full Course", image: "SpeedReadingEn", category: 12, is_locked: true },
  { id: 39, level_name: "Junior", image: "SpeedReadingSpeechTherapyEn1", category: 13, is_locked: true },
  { id: 40, level_name: "Basic", image: "SpeedReadingSpeechTherapyEn2", category: 13, is_locked: true },
  { id: 41, level_name: "Elementary", image: "SpeedReadingSpeechTherapyEn3", category: 13, is_locked: true },
  { id: 42, level_name: "Advanced", image: "SpeedReadingSpeechTherapyEn4", category: 13, is_locked: true },
  { id: 43, level_name: "Erudite", image: "SpeedReadingSpeechTherapyEn5", category: 13, is_locked: true },
  { id: 44, level_name: "Pro", image: "SpeedReadingSpeechTherapyEn6", category: 13, is_locked: true },
  { id: 45, level_name: "Full Course", image: "SpeedReadingSpeechTherapyEn", category: 13, is_locked: true },
  { id: 46, level_name: "Basic", image: "itGeliosStartEn", category: 14, is_locked: true },
];

const imageMap: Record<string, string> = {
  SpeechTherapyUk, MentalArithmeticUk1, MentalArithmeticUk2, MentalArithmeticUk3, MentalArithmeticUk4, MentalArithmeticUk, MultiplicationandDivisionUkr,
  SchooolPreparationEn, SpeedReadingUk1, SpeedReadingUk2, SpeedReadingUk3, SpeedReadingUk4, SpeedReadingUk5, SpeedReadingUk6, SpeedReadingUk,
  SpeedReadingSpeechTherapyUk1, SpeedReadingSpeechTherapyUk2, SpeedReadingSpeechTherapyUk4, SpeedReadingSpeechTherapyUk5,
  SpeedReadingSpeechTherapyUk6, SpeedReadingSpeechTherapyUk, itGeliosStartEn, SpeechTherapyEn, MentalArithmeticEn1, MentalArithmeticEn2, MentalArithmeticEn3,
  MentalArithmeticEn4, MentalArithmeticEn, SpeedReadingEn1, SpeedReadingEn2, SpeedReadingEn3, SpeedReadingEn4, SpeedReadingEn5, SpeedReadingEn6, SpeedReadingEn,
  SpeedReadingSpeechTherapyEn1, SpeedReadingSpeechTherapyEn2, SpeedReadingSpeechTherapyEn3, SpeedReadingSpeechTherapyEn4, SpeedReadingSpeechTherapyEn5,
  SpeedReadingSpeechTherapyEn6, SpeedReadingSpeechTherapyEn
};

const getCertificateImagePath = (imageNameFromBackend: string): string | undefined => {
  if (!imageNameFromBackend) return undefined;
  return imageMap[imageNameFromBackend];
};

const certificatesStore = useCertificatesStore();
const { getStudentCertificates: studentCertificates, loading, error } = storeToRefs(certificatesStore);

const displayedCertificates = computed(() => {
  const certs = [...masterCertificateList].sort((a,b) => a.id - b.id);
  if (loading.value || error.value || !studentCertificates.value || studentCertificates.value.length === 0) {
    return certs;
  }
  const earnedCertsMap = new Map();
  studentCertificates.value.forEach(student => {
    if (student.certificates && student.certificates.length > 0) {
      student.certificates.forEach(cert => {
        earnedCertsMap.set(cert.id, { ...cert, student_name: `${student.first_name} ${student.last_name}` });
      });
    }
  });
  return certs.map(masterCert => {
    if (earnedCertsMap.has(masterCert.id)) {
      const earnedCert = earnedCertsMap.get(masterCert.id);
      return { ...masterCert, ...earnedCert, is_locked: false };
    }
    return masterCert;
  });
});

onMounted(() => {
  certificatesStore.fetchStudentCertificates();
});

const getCertificateCardClass = (certificate: any) => {
  const classes: string[] = [];
  if (certificate.is_locked) {
    classes.push('locked');
  }
  switch (certificate.category) {
    case 1: classes.push('level-profi'); break;
    case 2: classes.push('level-main'); break;
    case 3: classes.push('level-advanced'); break;
    case 4: classes.push('level-profi'); break;
    case 5: classes.push('level-erudit'); break;
    case 6: classes.push('level-combinations'); break;
    case 7: classes.push('level-full-course'); break;
    case 8: classes.push('level-profi'); break;
    case 9: classes.push('level-main'); break;
    case 10: classes.push('level-advanced'); break;
    case 11: classes.push('level-profi'); break;
    case 12: classes.push('level-erudit'); break;
    case 13: classes.push('level-combinations'); break;
    case 14: classes.push('level-full-course'); break;
    default: classes.push('level-basic'); break;
  }
  return classes;
};

const showImageViewerModal = ref(false);
const currentImageUrl = ref<string | null>(null);
const currentCertificateData = ref<any>(null);
const currentStudentName = ref('');

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

const showCertificateImageInModal = async (certificate: any, studentName: string): Promise<void> => {
  if (certificate.is_locked) return;
  const imagePath = getCertificateImagePath(certificate.image);
  if (!imagePath) return;
  openImageViewerModal(imagePath, certificate, studentName);
};

const pdfViewerModalRef = ref<any>(null);

const handleDownloadPdf = (certificate: any, studentName: string) => {
  if (certificate.is_locked) return;
  const imagePath = getCertificateImagePath(certificate.image);
  if (!imagePath) return;
  if (pdfViewerModalRef.value) {
    pdfViewerModalRef.value.setDownloadData(imagePath, certificate, studentName);
    pdfViewerModalRef.value.triggerDownload();
    pdfViewerModalRef.value.clearDownloadData();
  }
};
</script>

<template>
  <div class="certificate-form">
    <div v-if="loading" class="loading-message">Загрузка сертификатов...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else class="certificates-grid">
      <div
          v-for="certificate in displayedCertificates"
          :key="certificate.id"
          class="certificate-card"
          :class="getCertificateCardClass(certificate)">
        <div class="certificate-image">
          <img
              v-if="getCertificateImagePath(certificate.image)"
              :src="getCertificateImagePath(certificate.image)"
              alt=""
          >
          <i v-if="certificate.is_locked" class="lock-icon fas fa-lock"></i>
        </div>
        <div class="certificate-title">
          {{ certificate.level_name }}
        </div>
        <div v-if="!certificate.is_locked" class="certificate-overlay">
          <div class="overlay-icons">
            <i class="fas fa-eye overlay-icon" @click.stop="showCertificateImageInModal(certificate, certificate.student_name)"></i>
            <i class="fas fa-download overlay-icon" @click.stop="handleDownloadPdf(certificate, certificate.student_name)"></i>
          </div>
        </div>
      </div>
    </div>
    <ImageViewerModal
        ref="pdfViewerModalRef"
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
.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 15px;
  padding-top: 20px;

  .certificate-card {
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    height: 180px;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease;

    &:not(.locked) {
      cursor: pointer;
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
        .certificate-overlay {
          opacity: 1;
        }
      }
    }

    &.level-junior { background-color: #FCE4EC; }
    &.level-basic { background-color: #EDE7F6; }
    &.level-main { background-color: #E3F2FD; }
    &.level-advanced { background-color: #FFF3E0; }
    &.level-erudit { background-color: #E0F2F7; }
    &.level-profi { background-color: #F3E5F5; }
    &.level-full-course { background-color: #D1C4E9; }
    &.level-combinations { background-color: #C5E1A5; }

    &.locked {
      cursor: not-allowed;
      background-color: #ECEFF1; // Чуть темнее фон для заблокированных

      .certificate-image img {
        filter: grayscale(100%);
        opacity: 0.6;
      }
      .certificate-title {
        color: #78909C;
      }
    }
  }

  .certificate-image {
    width: 125px;
    height: 165px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    position: relative; // Важно для позиционирования замка

    img {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      border-radius: 8px;
    }

    .lock-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: rgba(255, 255, 255, 0.85);
      font-size: 3em;
      z-index: 10;
      pointer-events: none; // Иконка не перехватывает клики
      text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
    }
  }

  .certificate-title {
    font-weight: 500;
    font-size: 14px;
    color: #333;
    margin-top: auto;
    padding: 0 5px 5px;
    text-align: center;
    line-height: 1.2;
  }
}

.certificate-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 16px;

  .overlay-icons {
    display: flex;
    gap: 20px;
    .overlay-icon {
      color: white;
      font-size: 1.5em;
      cursor: pointer;
      transition: transform 0.2s ease, color 0.2s ease;
      &:hover {
        transform: scale(1.1);
        color: #0066FF;
      }
    }
  }
}

.loading-message, .error-message {
  text-align: center;
  font-size: 18px;
  color: #5F6D7E;
  margin-top: 50px;
}
.error-message {
  color: #D32F2F;
}
</style>