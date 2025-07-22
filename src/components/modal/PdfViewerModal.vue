<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <button class="close-button" @click="closeModal">&times;</button>
    <div class="modal-content">
      <div class="image-viewer-container">
        <img :src="imageUrl" alt="Certificate Preview" class="certificate-preview-image" v-if="imageUrl">
        <p v-else>Изображение не найдено.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineExpose } from 'vue'; // Import defineExpose
import { jsPDF } from 'jspdf'; // Импорт jspdf для генерации PDF в модалке

// --- Импорт шрифтов (они нужны здесь, так как PDF генерируется в модалке) ---
import NunitoFont from '@/assets/fonts/Nunito-VariableFont_wght.ttf';
import MarckScriptFont from '@/assets/fonts/MarckScript-Regular.ttf';

const props = defineProps<{
  imageUrl: string | null; // URL изображения для показа (без текста)
  showModal: boolean;
  certificateData: any; // Полные данные сертификата (для текста на PDF)
  studentName: string; // Имя студента (для текста на PDF)
}>();

const emit = defineEmits(['close']);

const isVisible = ref(props.showModal);

// Internal state for download trigger
const downloadTriggerData = ref<{
  imageUrl: string;
  certificateData: any;
  studentName: string;
} | null>(null);

watch(() => props.showModal, (newVal) => {
  isVisible.value = newVal;
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

watch(() => props.imageUrl, (newVal) => {
  if (newVal) {
    console.log("Image URL в модалке:", newVal);
  }
});

const closeModal = () => {
  isVisible.value = false;
  emit('close');
};

// --- Функция для форматирования даты (скопировано) ---
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}\n${year}`;
};

// --- Функция генерации и скачивания PDF (ТЕПЕРЬ ДОБАВЛЯЕТ ТЕКСТ) ---
const downloadPdf = async (imageUrlToUse: string, certificateToUse: any, studentNameToUse: string) => {
  if (!certificateToUse || !imageUrlToUse || !studentNameToUse) {
    console.error("Недостаточно данных для генерации PDF.");
    return;
  }

  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrlToUse; // Используем переданный URL

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');

    ctx.drawImage(img, 0, 0); // Рисуем базовое изображение сертификата

    const marckScriptFont = new FontFace('MarckScript', `url(${MarckScriptFont})`);
    const nunitoFont = new FontFace('Nunito', `url(${NunitoFont})`);

    await Promise.all([marckScriptFont.load(), nunitoFont.load()]).then(([loadedMarckScript, loadedNunito]) => {
      document.fonts.add(loadedMarckScript);
      document.fonts.add(loadedNunito);

      // --- НАНОСИМ ТЕКСТ (ИМЯ СТУДЕНТА) ---
      ctx.font = 'italic bold 100px MarckScript, sans-serif';
      ctx.fillStyle = '#800080'; // Фиолетовый цвет
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Эти координаты - из ваших предыдущих реализаций
      ctx.fillText(studentNameToUse, canvas.width / 2 + 500, canvas.height / 2 - 15);

      // --- НАНОСИМ ТЕКСТ (ДАТА) ---
      ctx.font = 'bold 55px Nunito, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      const certificateDate = new Date(certificateToUse.created_at);
      const dateText = formatDate(certificateDate);
      const dateLines = dateText.split('\n');
      // Эти координаты - из ваших предыдущих реализаций
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
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, img.width, img.height);

      const fileName = `Certificate_${studentNameToUse}_${certificateToUse.direction_name}_${certificateToUse.level_name}.pdf`;
      pdf.save(fileName); // Скачиваем PDF
    });
  } catch (error) {
    console.error('Ошибка при генерации или скачивании PDF:', error);
  }
};

// --- Методы, которые будут доступны для родительского компонента ---
const setDownloadData = (imageUrl: string, certificateData: any, studentName: string) => {
  downloadTriggerData.value = { imageUrl, certificateData, studentName };
};

const triggerDownload = () => {
  if (downloadTriggerData.value) {
    downloadPdf(
        downloadTriggerData.value.imageUrl,
        downloadTriggerData.value.certificateData,
        downloadTriggerData.value.studentName
    );
  }
};

const clearDownloadData = () => {
  downloadTriggerData.value = null;
};

// Expose methods to parent component
defineExpose({
  setDownloadData,
  triggerDownload,
  clearDownloadData,
});
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: rgba(255, 255, 255, 0);
  border-radius: 10px;
  width: 90%;
  max-width: 700px;
  height: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
}

.close-button {
  position: absolute;
  top: 50px;
  right: 150px;
  background: none;
  border: none;
  font-size: 2.5em;
  cursor: pointer;
  color: #ffffff;
  line-height: 1;
  z-index: 1001;
}

.image-viewer-container {
  margin-top: 60px;
  flex-grow: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  overflow: hidden;

  .certificate-preview-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 5px;
  }
}
// .download-button is removed as it's no longer needed inside the modal.
</style>