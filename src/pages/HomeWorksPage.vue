<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHomeworksStore, ApiHomework } from '@/stores/homeworks';

// Import trainer images
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

// Interfaces for component data
interface HomeworkBase {
  id: number;
  createdAt: string;
}

interface ActiveHomework extends HomeworkBase {
  isScheduled: false;
  titleKey: string;
  dueDate: string;
  startDate: string;
  rewards: number;
  iconImage: string;
  trainerSlug: string;
  settings: { [key: string]: any }; // <-- ДОБАВЛЕНО: поле для настроек
}

interface ScheduledHomework extends HomeworkBase {
  isScheduled: true;
  startDate: string;
}

type Homework = ActiveHomework | ScheduledHomework;

const router = useRouter();
const { t, locale } = useI18n();
const homeworksStore = useHomeworksStore();

const slugify = (text: string): string => {
  const ua: { [key: string]: string } = { 'а':'a','б':'b','в':'v','г':'h','ґ':'g','д':'d','е':'e','є':'ie','ж':'zh','з':'z','и':'y','і':'i','ї':'i','й':'i','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ь':'','ю':'iu','я':'ia' };
  return text.toLowerCase().trim()
      .replace(/[а-яґєїі]/g, (match) => ua[match as keyof typeof ua])
      .replace(/ & /g, '-and-')
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
};

const pluralize = (key: string, count: number): string => {
  const forms = t(key).split(' | ');
  const absCount = Math.abs(count);
  if (locale.value === 'en') return absCount === 1 ? forms[0] : forms[1] || forms[0];
  const cases = [2, 0, 1, 1, 1, 2];
  const formIndex = (absCount % 100 > 4 && absCount % 100 < 20) ? 2 : cases[(absCount % 10 < 5) ? absCount % 10 : 5];
  return forms[formIndex] || forms[0];
};

const trainers = [
  { id: 1, key: 'add_homework.trainers.find_pair', name_uk: 'Знайди пару', image: trainer1 },
  { id: 2, key: 'add_homework.trainers.speed_reading_technique', name_uk: 'Тест швидкості читання', image: trainer2 },
  { id: 3, key: 'add_homework.trainers.schulte_table', name_uk: 'Таблиця Шульте', image: trainer3 },
  { id: 4, key: 'add_homework.trainers.spritz', name_uk: 'Spritz', image: trainer4 },
  { id: 5, key: 'add_homework.trainers.mental_arithmetic', name_uk: 'Ментальна арифметика', image: trainer5 },
  { id: 6, key: 'add_homework.trainers.fillwords', name_uk: 'Філворди', image: trainer6 },
  { id: 7, key: 'add_homework.trainers.stroop_test', name_uk: 'Тест Струпа', image: trainer7 },
  { id: 8, key: 'add_homework.trainers.alphabet', name_uk: 'Алфавіт', image: trainer8 },
  { id: 9, key: 'add_homework.trainers.find_word', name_uk: 'Знайди слово', image: trainer9 },
  { id: 10, key: 'add_homework.trainers.texts', name_uk: 'Тексти', image: trainer10 },
  { id: 11, key: 'add_homework.trainers.cybercat', name_uk: 'Кіберкішка', image: trainer11 },
  { id: 12, key: 'add_homework.trainers.flashcards', name_uk: 'Флеш карти', image: trainer12 },
  { id: 13, key: 'add_homework.trainers.abacus', name_uk: 'Абакус', image: trainer13 },
  { id: 14, key: 'add_homework.trainers.find_cybercat', name_uk: 'Знайди кіберкішку', image: trainer14 },
  { id: 15, key: 'add_homework.trainers.mnemonics', name_uk: 'Мнемотехніка', image: trainer15 },
  { id: 16, key: 'add_homework.trainers.multiplication_division', name_uk: 'Множення & Ділення', image: trainer16 },
].map(trainer => ({
  ...trainer,
  name: t(trainer.key),
  slug: slugify(trainer.name_uk)
}));

const getTrainerInfoById = (trainerId: number) => {
  const trainer = trainers.find(t => t.id === trainerId);
  if (trainer) return { titleKey: trainer.key, iconImage: trainer.image, trainerSlug: trainer.slug };
  return { titleKey: 'add_homework.trainers.unknown_trainer', iconImage: '', trainerSlug: 'unknown-trainer' };
};

// Process all homeworks from the store
const allHomeworks = computed<Homework[]>(() => {
  const now = new Date();
  // @ts-ignore
  return homeworksStore.getHomeworks.map((apiHw: ApiHomework) => {
    const isScheduled = new Date(apiHw.startDate) > now;
    if (isScheduled) {
      return {
        id: apiHw.id,
        isScheduled: true,
        createdAt: apiHw.createDate,
        startDate: apiHw.startDate,
      };
    } else {
      const trainerInfo = getTrainerInfoById(apiHw.trainerId);
      return {
        id: apiHw.id,
        isScheduled: false,
        titleKey: trainerInfo.titleKey,
        createdAt: apiHw.createDate,
        dueDate: apiHw.deadline,
        startDate: apiHw.startDate,
        rewards: 32,
        iconImage: trainerInfo.iconImage,
        trainerSlug: trainerInfo.trainerSlug,
        settings: apiHw.homeWorksSettings, // <-- ИЗМЕНЕНО: сохраняем настройки
      };
    }
  });
});

// Separate computed properties for active and scheduled homeworks
const activeHomeworks = computed(() => allHomeworks.value.filter((hw): hw is ActiveHomework => !hw.isScheduled));
const scheduledHomeworks = computed(() => allHomeworks.value.filter((hw): hw is ScheduledHomework => hw.isScheduled));

const formatTimeRemaining = (ms: number): string => {
  if (ms < 0) ms = 0;
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  let result = '';
  if (days > 0) result = `${days} ${pluralize('homework.days', days)}`;
  else if (hours > 0) result = `${hours} ${pluralize('homework.hours', hours)}`;
  else if (minutes > 0) result = `${minutes} ${pluralize('homework.minutes', minutes)}`;
  else result = `${seconds} ${pluralize('homework.seconds', seconds)}`;
  return result;
};

const timers = ref<{ [key: number]: string }>({});
let interval: number;

const updateTimers = () => {
  const now = new Date().getTime();
  allHomeworks.value.forEach(hw => {
    if (hw.isScheduled) {
      const timeUntilStart = new Date(hw.startDate).getTime() - now;
      timers.value[hw.id] = formatTimeRemaining(timeUntilStart);
    } else {
      // @ts-ignore
      const timeUntilDeadline = new Date(hw.dueDate).getTime() - now;
      timers.value[hw.id] = timeUntilDeadline < 0
          ? `${t('homework.overdue_by')} ${formatTimeRemaining(Math.abs(timeUntilDeadline))}`
          : formatTimeRemaining(timeUntilDeadline);
    }
  });
};

// <-- ИЗМЕНЕНО: функция теперь передает и настройки
const handleHomeworkAction = (homework: ActiveHomework) => {
  router.push({
    name: 'game-view',
    params: { trainerSlug: homework.trainerSlug },
    query: { config: JSON.stringify(homework.settings) }
  });
};

onMounted(() => {
  homeworksStore.fetchHomeworks();
  interval = setInterval(updateTimers, 1000);
});
onUnmounted(() => { clearInterval(interval); });

const getProgressBarWidth = (homework: Homework) => {
  const nowMs = new Date().getTime();
  const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

  let remainingTimeMs: number;
  let totalDurationMs: number = TWENTY_FOUR_HOURS_MS;

  if (homework.isScheduled) {
    const startMs = new Date(homework.startDate).getTime();
    if (nowMs > startMs) return '0%';
    remainingTimeMs = startMs - nowMs;
  } else {
    // @ts-ignore
    const dueDateMs = new Date(homework.dueDate).getTime();
    if (nowMs > dueDateMs) return '0%';
    remainingTimeMs = dueDateMs - nowMs;
  }

  const clampedRemainingTime = Math.min(remainingTimeMs, totalDurationMs);
  const percentage = (clampedRemainingTime / totalDurationMs) * 100;
  return `${Math.max(0, Math.min(100, percentage))}%`;
};

const getTimeBarColorClass = (homework: ActiveHomework) => {
  const timeLeft = new Date(homework.dueDate).getTime() - new Date().getTime();
  return timeLeft < 0 ? 'red-text-and-bar' : 'blue-text-and-bar';
};
</script>

<template>
  <div class="homeworks-page">
    <div v-if="homeworksStore.isLoading" class="loading-indicator">Загрузка...</div>
    <div v-else-if="homeworksStore.error" class="error-indicator">{{ homeworksStore.error }}</div>

    <div v-else class="homework-list">
      <div v-for="homework in activeHomeworks" :key="homework.id" class="homework-item">
        <div class="homework-icon">
          <img v-if="homework.iconImage" :src="homework.iconImage" :alt="t(homework.titleKey)" class="icon-image" />
        </div>
        <div class="homework-details">
          <div class="homework-grid">
            <div class="homework-title">{{ t(homework.titleKey) }}</div>
            <div class="homework-time">
              <div class="homework-time-title">{{ $t('homework.time_to_perform') }}</div>
              <div class="time-value" :class="getTimeBarColorClass(homework)">{{ timers[homework.id] }}</div>
              <div class="time-bar-container" :class="getTimeBarColorClass(homework)">
                <div class="time-bar-progress" :class="getTimeBarColorClass(homework)" :style="{ width: getProgressBarWidth(homework) }"></div>
              </div>
            </div>
            <div class="homework-rewards">
              <div class="homework-rewards-title">{{ $t('homework.rewards') }}</div>
              <span class="reward-value"><span class="gelios-coin"><svg width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.4299 32.0846C12.339 32.0846 9.70604 31.4389 7.53095 30.1475C5.35587 28.8273 3.69594 27.005 2.55116 24.6804C1.40638 22.3271 0.833984 19.5864 0.833984 16.4583C0.833984 14.1337 1.1488 12.0243 1.77843 10.1302C2.43668 8.20741 3.38112 6.55724 4.61176 5.17971C5.87102 3.80218 7.40217 2.75468 9.2052 2.03721C11.0082 1.29105 13.0545 0.917969 15.3441 0.917969C17.6623 0.917969 19.7372 1.29105 21.5688 2.03721C23.4005 2.78338 24.9173 3.90262 26.1193 5.39495C27.35 6.85858 28.1513 8.69528 28.5234 10.9051H22.2986C22.0697 9.95802 21.6547 9.18316 21.0537 8.58049C20.4527 7.94912 19.6943 7.4756 18.7784 7.15991C17.8912 6.84423 16.8752 6.68639 15.7304 6.68639C14.1564 6.68639 12.8256 6.95902 11.738 7.50429C10.6505 8.04957 9.76328 8.79573 9.07641 9.74278C8.41816 10.6611 7.93163 11.723 7.61681 12.9283C7.33062 14.105 7.18752 15.3247 7.18752 16.5874C7.18752 18.3093 7.47372 19.9164 8.04611 21.4088C8.6185 22.8724 9.52001 24.0634 10.7507 24.9817C11.9813 25.8714 13.6126 26.3162 15.6446 26.3162C16.9897 26.3162 18.1774 26.1153 19.2077 25.7135C20.2666 25.2831 21.1109 24.6517 21.7406 23.8194C22.3988 22.9585 22.7709 21.9253 22.8567 20.72H14.5714V15.4251H29.1673V17.104C29.1673 20.2034 28.6522 22.8724 27.6219 25.1109C26.5916 27.3494 25.0604 29.0713 23.0284 30.2766C20.9964 31.482 18.4636 32.0846 15.4299 32.0846Z" fill="#D2BB3F"/></svg></span> +{{ homework.rewards }}</span>
            </div>
          </div>
          <button class="homework-button blue" @click="handleHomeworkAction(homework)">
            {{ $t('homework.perform') }}
          </button>
        </div>
      </div>

      <div v-for="homework in scheduledHomeworks" :key="homework.id" class="homework-item scheduled">
        <div class="homework-icon scheduled-icon">
        </div>
        <div class="homework-details scheduled-details">
          <div class="homework-title">Домашка вже на шляху!</div>
          <p class="homework-subtitle">Повернись пізніше</p>
        </div>
        <div class="scheduled-timer-section">
          <span class="scheduled-label">Стане доступною через</span>
          <div class="time-value purple-text">{{ timers[homework.id] }}</div>
          <div class="time-bar-container purple">
            <div class="time-bar-progress purple" :style="{ width: getProgressBarWidth(homework) }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// Common styles
.homeworks-page { padding: 20px; min-height: 100vh; }
.homework-list { display: flex; flex-direction: column; gap: 15px; max-height: 520px; overflow-y: auto; padding-right: 10px; }
.homework-item { background-color: #fff; border-radius: 28px; padding: 15px; display: flex; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1); position: relative; overflow: hidden; min-height: 92px; box-sizing: border-box; }
.homework-icon { width: 90px; height: 60px; border-radius: 12px; display: flex; justify-content: center; align-items: center; margin-right: 15px; flex-shrink: 0; overflow: hidden; }
.icon-image { width: 100%; height: 100%; object-fit: cover; }
.homework-details { flex-grow: 1; display: flex; flex-direction: column; }
.homework-title { font-size: 1.1em; font-weight: bold; color: #333; }
.time-value { font-weight: bold; }
.time-bar-container { height: 12px; border-radius: 10px; overflow: hidden; width: 100%; }
.time-bar-progress { height: 100%; border-radius: 10px; transition: width 0.5s ease-in-out; }

// Active homework styles
.homework-item:not(.scheduled) {
  &:nth-child(odd) { background-image: linear-gradient(to right, #e0f7fa, #ffffff); }
  &:nth-child(even) { background-image: linear-gradient(to right, #e8f5e9, #ffffff); }
}
.homework-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 70px; align-items: start; width: calc(100% - 20px); }
.homework-time { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }
.homework-time-title { font-size: 16px; line-height: 24px; }
.homework-rewards { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }
.reward-value { font-weight: bold; color: #000; font-size: 20px; display: flex; align-items: center; gap: 6px; }
.gelios-coin { background: #FFDF39; width: 24px; height: 24px; padding: 6px; border-radius: 50%; display: flex; justify-content: center; align-items: center; svg { width: 12px; height: 12px; } }
.homework-button {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px 18px;
  font-size: 14px;
  border-radius: 8px;
  color: #ffffff;
  border: none;
  cursor: pointer;
  &.blue {
    background: #0066FF;
    &:hover {
      background-color: #0052cc;
    }
  }
}
.blue-text-and-bar { color: #2196F3; .time-bar-container { background-color: #DEEBFF; } .time-bar-progress { background-color: #0066FF; } }
.red-text-and-bar { color: #F44336; .time-bar-container { background-color: #FFEBEE; } .time-bar-progress { background-color: #FF6666; } }

// Scheduled homework styles
.homework-item.scheduled {
  background: #F3F3FF;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.scheduled-icon { background-image:url("@/assets/backgrounds/trainers/question-mark.svg"); background-color: #D6D6FF; padding: 10px; .icon-image { object-fit: contain; } }
.scheduled-details { flex-grow: 1; margin-right: auto; }
.homework-subtitle { font-size: 0.9em; color: #666; margin: 0; }
.scheduled-timer-section { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; min-width: 200px; }
.scheduled-label { font-size: 0.9em; color: #888; }
.purple-text { color: #8A2BE2; }
.time-bar-container.purple { background-color: #E6E6FA; }
.time-bar-progress.purple { background-color: #9370DB; }
</style>