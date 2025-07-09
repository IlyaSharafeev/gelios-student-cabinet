<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'; // Import useI18n

// Import all trainer images
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

interface Homework {
  id: number;
  titleKey: string; // Use translation key instead of hardcoded title
  initialType: 'accept' | 'perform';
  currentType: 'accept' | 'perform';
  createdAt: string;
  dueDate: string;
  acceptedAt?: string;
  rewards: number;
  iconImage: string;
  trainerSlug: string;
}

const router = useRouter();
const { t, locale } = useI18n(); // Initialize i18n

// Utility function to slugify text
const slugify = (text: string): string => {
  const ua: { [key: string]: string } = { 'а':'a','б':'b','в':'v','г':'h','ґ':'g','д':'d','е':'e','є':'ie','ж':'zh','з':'z','и':'i','і':'i','ї':'i','й':'i','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ь':'','ю':'iu','я':'ia' };
  return text.toLowerCase().trim()
      .replace(/[а-яґєїі]/g, (match) => ua[match])
      .replace(/ & /g, '-and-')
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
};

// Helper function for pluralization based on locale
const pluralize = (key: string, count: number): string => {
  const forms = t(key).split(' | ');
  const absCount = Math.abs(count);

  if (locale.value === 'en') {
    return absCount === 1 ? forms[0] : forms[1] || forms[0];
  }

  // Logic for Ukrainian and Russian
  const cases = [2, 0, 1, 1, 1, 2];
  const formIndex = (absCount % 100 > 4 && absCount % 100 < 20) ? 2 : cases[(absCount % 10 < 5) ? absCount % 10 : 5];
  return forms[formIndex] || forms[0];
};

// Hardcoded list of all trainers aligned with i18n keys
const trainers = [
  { id: 1, key: 'add_homework.trainers.find_pair', image: trainer1 },
  { id: 2, key: 'add_homework.trainers.speed_reading_technique', image: trainer2 },
  { id: 3, key: 'add_homework.trainers.schulte_table', image: trainer3 },
  { id: 4, key: 'add_homework.trainers.spritz', image: trainer4 },
  { id: 5, key: 'add_homework.trainers.mental_arithmetic', image: trainer5 },
  { id: 6, key: 'add_homework.trainers.fillwords', image: trainer6 },
  { id: 7, key: 'add_homework.trainers.stroop_test', image: trainer7 },
  { id: 8, key: 'add_homework.trainers.alphabet', image: trainer8 },
  { id: 9, key: 'add_homework.trainers.find_word', image: trainer9 },
  { id: 10, key: 'add_homework.trainers.texts', image: trainer10 },
  { id: 11, key: 'add_homework.trainers.cybercat', image: trainer11 },
  { id: 12, key: 'add_homework.trainers.flashcards', image: trainer12 },
  { id: 13, key: 'add_homework.trainers.abacus', image: trainer13 },
  { id: 14, key: 'add_homework.trainers.find_cybercat', image: trainer14 },
  { id: 15, key: 'add_homework.trainers.mnemonics', image: trainer15 },
  { id: 16, key: 'add_homework.trainers.multiplication_division', image: trainer16 },
].map(trainer => ({
  ...trainer,
  name: t(trainer.key),
  slug: slugify(t(trainer.key, 'uk')), // Use Ukrainian for consistent slugs
}));


// Helper to get trainer image and slug by key
const getTrainerInfo = (key: string) => {
  const trainer = trainers.find(t => t.key === key);
  return {
    iconImage: trainer ? trainer.image : '',
    trainerSlug: trainer ? trainer.slug : slugify(t(key, 'uk')), // Fallback slugify
  };
};

const now = new Date();

const homeworks = ref<Homework[]>([
  {
    id: 1,
    titleKey: 'add_homework.trainers.find_cybercat',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
    rewards: 32,
    ...getTrainerInfo('add_homework.trainers.find_cybercat'),
  },
  {
    id: 2,
    titleKey: 'add_homework.trainers.speed_reading_technique',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString(),
    rewards: 32,
    ...getTrainerInfo('add_homework.trainers.speed_reading_technique'),
  },
  {
    id: 3,
    titleKey: 'add_homework.trainers.schulte_table',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString(),
    rewards: 32,
    ...getTrainerInfo('add_homework.trainers.schulte_table'),
  },
  {
    id: 4,
    titleKey: 'add_homework.trainers.spritz',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(now.getTime() + 6 * 60 * 60 * 1000).toISOString(),
    rewards: 32,
    ...getTrainerInfo('add_homework.trainers.spritz'),
  },
  {
    id: 5,
    titleKey: 'add_homework.trainers.mental_arithmetic',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 10 * 60 * 1000).toISOString(),
    dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    rewards: 32,
    ...getTrainerInfo('add_homework.trainers.mental_arithmetic'),
  },
  {
    id: 6,
    titleKey: 'add_homework.trainers.fillwords',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
    dueDate: new Date(now.getTime() + 1 * 60 * 60 * 1000).toISOString(),
    rewards: 32,
    ...getTrainerInfo('add_homework.trainers.fillwords'),
  },
  // ... (add other homeworks similarly) ...
  {
    id: 16,
    titleKey: 'add_homework.trainers.speed_reading_technique',
    initialType: 'accept',
    currentType: 'perform',
    createdAt: new Date(now.getTime() - 10 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
    acceptedAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
    rewards: 32,
    ...getTrainerInfo('add_homework.trainers.speed_reading_technique'),
  },
]);

const formatTimeRemaining = (ms: number): string => {
  const absoluteMs = Math.abs(ms);
  const seconds = Math.floor(absoluteMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let result = '';
  if (days > 0) {
    result = `${days} ${pluralize('homework.days', days)}`;
  } else if (hours > 0) {
    result = `${hours} ${pluralize('homework.hours', hours)}`;
  } else if (minutes > 0) {
    result = `${minutes} ${pluralize('homework.minutes', minutes)}`;
  } else {
    result = `${seconds} ${pluralize('homework.seconds', seconds)}`;
  }

  return ms < 0 ? `${t('homework.overdue_by')} ${result}` : result;
};


const calculateTimeRemaining = (isoDueDateString: string) => {
  const now = new Date();
  const dueDate = new Date(isoDueDateString);
  return dueDate.getTime() - now.getTime();
};

const timers = ref<{ [key: number]: string }>({});
let interval: number;

const updateTimers = () => {
  homeworks.value.forEach(hw => {
    timers.value[hw.id] = formatTimeRemaining(calculateTimeRemaining(hw.dueDate));
  });
};

const handleHomeworkAction = (homework: Homework) => {
  if (homework.currentType === 'accept') {
    const acceptanceTime = new Date();
    homework.acceptedAt = acceptanceTime.toISOString();
    homework.dueDate = new Date(acceptanceTime.getTime() + 24 * 60 * 60 * 1000).toISOString();
    homework.currentType = 'perform';
    updateTimers();
  } else if (homework.currentType === 'perform') {
    if (homework.trainerSlug) {
      router.push({ name: 'game-view', params: { trainerSlug: homework.trainerSlug } });
    } else {
      console.warn(`No trainerSlug defined for homework: ${t(homework.titleKey)}`);
    }
  }
};

onMounted(() => {
  updateTimers();
  interval = setInterval(updateTimers, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

// Computed property to determine time bar width
const getTimeBarWidth = (homework: Homework) => {
  const nowMs = new Date().getTime();
  const dueDateMs = new Date(homework.dueDate).getTime();

  if (homework.currentType === 'perform') {
    return '100%';
  }

  const timeLeft = dueDateMs - nowMs;

  if (timeLeft < 0) {
    return '100%';
  }

  let totalDuration: number;
  let elapsedTime: number;

  if (homework.currentType === 'perform' && homework.acceptedAt) {
    const acceptedAtMs = new Date(homework.acceptedAt).getTime();
    totalDuration = 24 * 60 * 60 * 1000;
    elapsedTime = nowMs - acceptedAtMs;
  } else {
    const createdAtMs = new Date(homework.createdAt).getTime();
    totalDuration = dueDateMs - createdAtMs;
    elapsedTime = nowMs - createdAtMs;
  }

  if (totalDuration <= 0) {
    return '100%';
  }

  const progressPercentage = Math.max(0, Math.min(100, (elapsedTime / totalDuration) * 100));

  return `${progressPercentage}%`;
};

// Computed property to determine time bar color
const getTimeBarColorClass = (homework: Homework) => {
  const timeLeft = calculateTimeRemaining(homework.dueDate);

  if (homework.currentType === 'perform') {
    return 'red-text-and-bar';
  } else {
    return timeLeft < 0 ? 'red-text-and-bar' : 'blue-text-and-bar';
  }
};
</script>

<template>
  <div class="homeworks-page">
    <div class="homework-list">
      <div v-for="homework in homeworks" :key="homework.id" class="homework-item">
        <div class="homework-icon">
          <img :src="homework.iconImage" :alt="t(homework.titleKey)" class="icon-image" />
        </div>
        <div class="homework-details">
          <div class="homework-grid">
            <div class="homework-title">{{ t(homework.titleKey) }}</div>
            <div class="homework-time">
              <div class="homework-time-title">{{ homework.acceptedAt ? $t('homework.time_to_perform') : $t('homework.time_to_accept') }}</div>
              <div class="homework-time-title-progress-bar-wrapper">
                <div class="time-value" :class="getTimeBarColorClass(homework)">{{ timers[homework.id] }}</div>
                <div
                    class="time-bar-container"
                    :class="getTimeBarColorClass(homework)"
                >
                  <div
                      class="time-bar-progress"
                      :class="getTimeBarColorClass(homework)"
                      :style="{ width: getTimeBarWidth(homework) }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="homework-rewards">
              <div class="homework-rewards-title">{{ $t('homework.rewards') }}</div>
              <span class="reward-value"><span class="gelios-coin"><svg width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.4299 32.0846C12.339 32.0846 9.70604 31.4389 7.53095 30.1475C5.35587 28.8273 3.69594 27.005 2.55116 24.6804C1.40638 22.3271 0.833984 19.5864 0.833984 16.4583C0.833984 14.1337 1.1488 12.0243 1.77843 10.1302C2.43668 8.20741 3.38112 6.55724 4.61176 5.17971C5.87102 3.80218 7.40217 2.75468 9.2052 2.03721C11.0082 1.29105 13.0545 0.917969 15.3441 0.917969C17.6623 0.917969 19.7372 1.29105 21.5688 2.03721C23.4005 2.78338 24.9173 3.90262 26.1193 5.39495C27.35 6.85858 28.1513 8.69528 28.5234 10.9051H22.2986C22.0697 9.95802 21.6547 9.18316 21.0537 8.58049C20.4527 7.94912 19.6943 7.4756 18.7784 7.15991C17.8912 6.84423 16.8752 6.68639 15.7304 6.68639C14.1564 6.68639 12.8256 6.95902 11.738 7.50429C10.6505 8.04957 9.76328 8.79573 9.07641 9.74278C8.41816 10.6611 7.93163 11.723 7.61681 12.9283C7.33062 14.105 7.18752 15.3247 7.18752 16.5874C7.18752 18.3093 7.47372 19.9164 8.04611 21.4088C8.6185 22.8724 9.52001 24.0634 10.7507 24.9817C11.9813 25.8714 13.6126 26.3162 15.6446 26.3162C16.9897 26.3162 18.1774 26.1153 19.2077 25.7135C20.2666 25.2831 21.1109 24.6517 21.7406 23.8194C22.3988 22.9585 22.7709 21.9253 22.8567 20.72H14.5714V15.4251H29.1673V17.104C29.1673 20.2034 28.6522 22.8724 27.6219 25.1109C26.5916 27.3494 25.0604 29.0713 23.0284 30.2766C20.9964 31.482 18.4636 32.0846 15.4299 32.0846Z" fill="#D2BB3F"/>
</svg></span> +{{ homework.rewards }}</span>
            </div>
          </div>
          <button
              :class="['homework-button', { 'blue': homework.currentType === 'accept', 'red': homework.currentType === 'perform' }]"
              @click="handleHomeworkAction(homework)"
          >
            {{ homework.currentType === 'accept' ? $t('homework.accept') : $t('homework.perform') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// Styles remain the same as in the original file
.homeworks-page {
  padding: 20px;
  min-height: 100vh;

  h1 {
    color: #333;
    margin-bottom: 20px;
  }
}

.homework-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 520px;
  overflow-y: auto;
  padding-right: 10px;
}

.homework-item {
  background-color: #fff;
  border-radius: 28px;
  padding: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  min-height: 92px;
  box-sizing: border-box;

  &:nth-child(odd) {
    background-image: linear-gradient(to right, #e0f7fa, #ffffff);
  }
  &:nth-child(even) {
    background-image: linear-gradient(to right, #e8f5e9, #ffffff);
  }
}

.homework-icon {
  width: 90px;
  height: 60px;
  border-radius: 12px;
  background-color: transparent; // As per screenshot
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: white;
  margin-right: 15px;
  flex-shrink: 0;
  overflow: hidden;

  .icon-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.homework-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.homework-title {
  font-size: 1.1em;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.homework-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* Two columns for time and rewards */
  gap: 70px; /* Space between time and rewards sections */
  align-items: center; /* Align items to the top of their cells */
  width: calc(100% - 20px); /* Adjust width to make space for the button */
}

.homework-time {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 0.9em;
  color: #555;
  position: relative;
  width: 100%;

  &-title {
    font-family: Onest;
    font-weight: 500;
    font-style: Medium;
    font-size: 16px;
    leading-trim: NONE;
    line-height: 24px;
    letter-spacing: 0%;
  }
}

.homework-time-title-progress-bar-wrapper {
  display: flex;
  flex-direction: row; /* Changed to row to place items side-by-side */
  align-items: center; /* Vertically align items in the row */
  gap: 10px; /* Add space between the time value and the bar */
  width: 100%; // Ensure it takes full width of its parent to manage internal spacing
}

.time-value {
  font-weight: bold;
  margin-top: 2px;
  display: flex;
  flex-shrink: 0; /* Prevent the time value from shrinking */

  &.blue-text-and-bar {
    color: #2196F3;
  }

  &.red-text-and-bar {
    color: #F44336;
  }
}

.time-bar-container {
  flex-grow: 1;
  height: 12px;
  border-radius: 3px;
  overflow: hidden;
  position: relative;

  &.blue-text-and-bar {
    background-color: #DEEBFF;
    border-radius: 10px;
  }

  &.red-text-and-bar {
    background-color: #FFEBEE; // A lighter red for the container
    border-radius: 10px;
  }

  // Fallback or default if no specific class is applied
  &:not(.blue-text-and-bar):not(.red-text-and-bar) {
    background-color: #ddd; // Original gray for unclassified states
  }
}

.time-bar-progress {
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease-in-out; /* Smooth transition for width changes */

  &.blue-text-and-bar {
    background-color: #0066FF;
  }

  &.red-text-and-bar {
    background-color: #FF6666;
  }
}

.homework-rewards {
  font-size: 0.9em;
  color: #555;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;

  &-title {
    font-family: Onest;
    font-weight: 500;
    font-style: Medium;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0%;
  }
}

.reward-value {
  font-weight: bold;
  color: #000;
  margin-top: 2px;
  display: flex;
  align-items: center;
  font-size: 20px;
  gap: 6px;
}

.homework-button {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px 18px;
  font-family: Onest;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -2%;
  border-radius: 8px;
  color: #ffffff;

  &.blue {
    background: #0066FF;
    &:hover {
      background-color: #1976D2;
    }
  }

  &.red {
    background-color: #FF6666;
    &:hover {
      background-color: #D32F2F;
    }
  }
}

.gelios-coin {
  background: #FFDF39;
  width: 24px;
  height: 24px;
  padding: 6px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 12px;
    height: 12px;
  }
}
</style>