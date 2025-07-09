<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter

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
  title: string;
  initialType: 'accept' | 'perform'; // Store initial type
  currentType: 'accept' | 'perform'; // Current state
  createdAt: string; // ISO 8601 string - when homework was assigned
  dueDate: string; // ISO 8601 string - when homework is due
  acceptedAt?: string; // ISO 8601 string, if accepted
  rewards: number;
  iconImage: string;
  trainerSlug: string; // Add trainerSlug for navigation
}

const router = useRouter();

// Utility function to slugify text (copied from GamesPage.vue)
const slugify = (text: string): string => {
  const ua: { [key: string]: string } = { 'а':'a','б':'b','в':'v','г':'h','ґ':'g','д':'d','е':'e','є':'ie','ж':'zh','з':'z','и':'y','і':'i','ї':'i','й':'i','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ь':'','ю':'iu','я':'ia' };
  return text.toLowerCase().trim()
      .replace(/[а-яґєїі]/g, (match) => ua[match])
      .replace(/ & /g, '-and-')
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
};

// Hardcoded list of all trainers from GamesPage.vue to ensure correct slugs and images
const trainers = [
  { id: 1, name: 'Знайди пару', slug: slugify('Знайди пару'), image: trainer1 },
  { id: 2, name: 'Тест швидкості читання', slug: slugify('Тест швидкості читання'), image: trainer2 },
  { id: 3, name: 'Таблиця Шульте', slug: slugify('Таблиця Шульте'), image: trainer3 },
  { id: 4, name: 'Spritz', slug: slugify('Spritz'), image: trainer4 },
  { id: 5, name: 'Ментальна арифметика', slug: slugify('Ментальна арифметика'), image: trainer5 },
  { id: 6, name: 'Філворди', slug: slugify('Філворди'), image: trainer6 },
  { id: 7, name: 'Тест Струпа', slug: slugify('Тест Струпа'), image: trainer7 },
  { id: 8, name: 'Алфавіт', slug: slugify('Алфавіт'), image: trainer8 },
  { id: 9, name: 'Знайди слово', slug: slugify('Знайди слово'), image: trainer9 },
  { id: 10, name: 'Тексти', slug: slugify('Тексти'), image: trainer10 },
  { id: 11, name: 'Кіберкішка', slug: slugify('Кіберкішка'), image: trainer11 },
  { id: 12, name: 'Флеш карти', slug: slugify('Флеш карти'), image: trainer12 },
  { id: 13, name: 'Абакус', slug: slugify('Абакус'), image: trainer13 },
  { id: 14, name: 'Знайди кіберкішку', slug: slugify('Знайди кіберкішку'), image: trainer14 },
  { id: 15, name: 'Мнемотехніка', slug: slugify('Мнемотехніка'), image: trainer15 },
  { id: 16, name: 'Множення & Ділення', slug: slugify('Множення & Ділення'), image: trainer16 },
];

// Helper to get trainer image and slug by name
const getTrainerInfo = (name: string) => {
  const trainer = trainers.find(t => t.name === name);
  return {
    iconImage: trainer ? trainer.image : '',
    trainerSlug: trainer ? trainer.slug : slugify(name), // Fallback slugify
  };
};

// Current date for setting due dates relative to now - now dynamically calculated
const now = new Date();

const homeworks = ref<Homework[]>([
  {
    id: 1,
    title: 'Знайди кіберкішку',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    dueDate: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(), // Due in 24 hours
    rewards: 32,
    ...getTrainerInfo('Знайди кіберкішку'),
  },
  {
    id: 2,
    title: 'Тест швидкості читання',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    dueDate: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString(), // Due in 12 hours
    rewards: 32,
    ...getTrainerInfo('Тест швидкості читання'),
  },
  {
    id: 3,
    title: 'Таблиця Шульте',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    dueDate: new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString(), // Due in 2 days
    rewards: 32,
    ...getTrainerInfo('Таблиця Шульте'),
  },
  {
    id: 4,
    title: 'Spritz',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    dueDate: new Date(now.getTime() + 6 * 60 * 60 * 1000).toISOString(), // Due in 6 hours
    rewards: 32,
    ...getTrainerInfo('Spritz'),
  },
  {
    id: 5,
    title: 'Ментальна арифметика',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
    dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), // Due in 3 days
    rewards: 32,
    ...getTrainerInfo('Ментальна арифметика'),
  },
  {
    id: 6,
    title: 'Філворди',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    dueDate: new Date(now.getTime() + 1 * 60 * 60 * 1000).toISOString(), // Due in 1 hour
    rewards: 32,
    ...getTrainerInfo('Філворди'),
  },
  {
    id: 7,
    title: 'Тест Струпа',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Due in 2 days
    rewards: 32,
    ...getTrainerInfo('Тест Струпа'),
  },
  {
    id: 8,
    title: 'Алфавіт',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    dueDate: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(), // Due in 2 hours
    rewards: 32,
    ...getTrainerInfo('Алфавіт'),
  },
  {
    id: 9,
    title: 'Знайди слово',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 7 * 60 * 60 * 1000).toISOString(), // 7 hours ago
    dueDate: new Date(now.getTime() + 20 * 60 * 60 * 1000).toISOString(), // Due in 20 hours
    rewards: 32,
    ...getTrainerInfo('Знайди слово'),
  },
  {
    id: 10,
    title: 'Тексти',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(), // Due in 5 days
    rewards: 32,
    ...getTrainerInfo('Тексти'),
  },
  {
    id: 11,
    title: 'Кіберкішка',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    dueDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(), // Due in 1 day
    rewards: 32,
    ...getTrainerInfo('Кіберкішка'),
  },
  {
    id: 12,
    title: 'Флеш карти',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    dueDate: new Date(now.getTime() + 18 * 60 * 60 * 1000).toISOString(), // Due in 18 hours
    rewards: 32,
    ...getTrainerInfo('Флеш карти'),
  },
  {
    id: 13,
    title: 'Абакус',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 9 * 60 * 60 * 1000).toISOString(), // 9 hours ago
    dueDate: new Date(now.getTime() + 30 * 60 * 60 * 1000).toISOString(), // Due in 30 hours
    rewards: 32,
    ...getTrainerInfo('Абакус'),
  },
  {
    id: 14,
    title: 'Мнемотехніка',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    dueDate: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(), // Due in 4 days
    rewards: 32,
    ...getTrainerInfo('Мнемотехніка'),
  },
  {
    id: 15,
    title: 'Множення & Ділення',
    initialType: 'accept',
    currentType: 'accept',
    createdAt: new Date(now.getTime() - 20 * 60 * 1000).toISOString(), // 20 minutes ago
    dueDate: new Date(now.getTime() + 5 * 60 * 60 * 1000).toISOString(), // Due in 5 hours
    rewards: 32,
    ...getTrainerInfo('Множення & Ділення'),
  },
  // Example of an already accepted homework
  {
    id: 16,
    title: 'Тест швидкості читання', // Changed from Знайди пару to match screenshot
    initialType: 'accept',
    currentType: 'perform', // Already accepted
    createdAt: new Date(now.getTime() - 10 * 60 * 60 * 1000).toISOString(), // Assigned 10 hours ago
    dueDate: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(), // Was due 1 hour ago (for overdue example)
    acceptedAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(), // Accepted 8 hours ago
    rewards: 32,
    ...getTrainerInfo('Тест швидкості читання'),
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
    result = `${days} дні(в)`;
  } else if (hours > 0) {
    result = `${hours} годи(н)`;
  } else if (minutes > 0) {
    result = `${minutes} хвили(н)`;
  } else {
    result = `${seconds} секунди(н)`;
  }

  // Add "Прострочено" prefix if time is negative
  return ms < 0 ? `Прострочено на ${result}` : result;
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
    // Set new dueDate to 24 hours from acceptance time
    homework.dueDate = new Date(acceptanceTime.getTime() + 24 * 60 * 60 * 1000).toISOString();
    homework.currentType = 'perform'; // Change type to 'perform' after accepting
    updateTimers(); // Update timers immediately
  } else if (homework.currentType === 'perform') {
    // Logic for performing homework (navigate to trainer)
    if (homework.trainerSlug) {
      router.push({ name: 'game-view', params: { trainerSlug: homework.trainerSlug } });
    } else {
      console.warn(`No trainerSlug defined for homework: ${homework.title}`);
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

  // If homework is in 'perform' state, the bar should be 100% full (red)
  // This visually indicates it's an active, ongoing task.
  if (homework.currentType === 'perform') {
    return '100%';
  }

  const timeLeft = dueDateMs - nowMs;

  if (timeLeft < 0) {
    return '100%'; // If overdue (for acceptance), also show 100% progress
  }

  let totalDuration: number;
  let elapsedTime: number;

  if (homework.currentType === 'perform' && homework.acceptedAt) {
    const acceptedAtMs = new Date(homework.acceptedAt).getTime();
    totalDuration = 24 * 60 * 60 * 1000; // 24 hours from acceptance
    elapsedTime = nowMs - acceptedAtMs;
  } else {
    const createdAtMs = new Date(homework.createdAt).getTime();
    totalDuration = dueDateMs - createdAtMs;
    elapsedTime = nowMs - createdAtMs;
  }

  // Ensure totalDuration is positive to avoid division by zero or negative results
  if (totalDuration <= 0) {
    return '100%'; // Fallback if duration is invalid or already passed
  }

  // Calculate the percentage of time elapsed, clamping at 0% and 100%
  const progressPercentage = Math.max(0, Math.min(100, (elapsedTime / totalDuration) * 100));

  return `${progressPercentage}%`;
};

// Computed property to determine time bar color
const getTimeBarColorClass = (homework: Homework) => {
  const timeLeft = calculateTimeRemaining(homework.dueDate);

  if (homework.currentType === 'perform') {
    // If homework is accepted (currentType is 'perform'), the bar should be red
    // This is because acceptance means the "timer" for performing has started,
    // and visually, you want to convey a sense of urgency/active task.
    return 'red-text-and-bar';
  } else {
    // For unaccepted homework, if overdue for acceptance, it's red. Otherwise, blue.
    return timeLeft < 0 ? 'red-text-and-bar' : 'blue-text-and-bar';
  }
};
</script>

<template>
  <div class="homeworks-page">
    <div class="homework-list">
      <div v-for="homework in homeworks" :key="homework.id" class="homework-item">
        <div class="homework-icon">
          <img :src="homework.iconImage" :alt="homework.title" class="icon-image" />
        </div>
        <div class="homework-details">
          <div class="homework-grid">
            <div class="homework-title">{{ homework.title }}</div>
            <div class="homework-time">
              <div class="homework-time-title">{{ homework.acceptedAt ? 'Час на виконання:' : 'Час на прийняття:' }}</div>
              <div class="homework-time-title-progress-bar-wrapper">
                <div class="time-value" :class="getTimeBarColorClass(homework)">{{ timers[homework.id] }}</div>
                <div class="time-bar-container">
                  <div
                      class="time-bar-progress"
                      :class="getTimeBarColorClass(homework)"
                      :style="{ width: getTimeBarWidth(homework) }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="homework-rewards">
              <div class="homework-rewards-title">Винагороди</div>
              <span class="reward-value"><span class="gelios-coin"><svg width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.4299 32.0846C12.339 32.0846 9.70604 31.4389 7.53095 30.1475C5.35587 28.8273 3.69594 27.005 2.55116 24.6804C1.40638 22.3271 0.833984 19.5864 0.833984 16.4583C0.833984 14.1337 1.1488 12.0243 1.77843 10.1302C2.43668 8.20741 3.38112 6.55724 4.61176 5.17971C5.87102 3.80218 7.40217 2.75468 9.2052 2.03721C11.0082 1.29105 13.0545 0.917969 15.3441 0.917969C17.6623 0.917969 19.7372 1.29105 21.5688 2.03721C23.4005 2.78338 24.9173 3.90262 26.1193 5.39495C27.35 6.85858 28.1513 8.69528 28.5234 10.9051H22.2986C22.0697 9.95802 21.6547 9.18316 21.0537 8.58049C20.4527 7.94912 19.6943 7.4756 18.7784 7.15991C17.8912 6.84423 16.8752 6.68639 15.7304 6.68639C14.1564 6.68639 12.8256 6.95902 11.738 7.50429C10.6505 8.04957 9.76328 8.79573 9.07641 9.74278C8.41816 10.6611 7.93163 11.723 7.61681 12.9283C7.33062 14.105 7.18752 15.3247 7.18752 16.5874C7.18752 18.3093 7.47372 19.9164 8.04611 21.4088C8.6185 22.8724 9.52001 24.0634 10.7507 24.9817C11.9813 25.8714 13.6126 26.3162 15.6446 26.3162C16.9897 26.3162 18.1774 26.1153 19.2077 25.7135C20.2666 25.2831 21.1109 24.6517 21.7406 23.8194C22.3988 22.9585 22.7709 21.9253 22.8567 20.72H14.5714V15.4251H29.1673V17.104C29.1673 20.2034 28.6522 22.8724 27.6219 25.1109C26.5916 27.3494 25.0604 29.0713 23.0284 30.2766C20.9964 31.482 18.4636 32.0846 15.4299 32.0846Z" fill="#D2BB3F"/>
</svg></span> +{{ homework.rewards }}</span>
            </div>
          </div>
          <button
              :class="['homework-button', { 'blue': homework.currentType === 'accept', 'red': homework.currentType === 'perform' }]"
              @click="handleHomeworkAction(homework)"
          >
            {{ homework.currentType === 'accept' ? 'Прийняти' : 'Виконати' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
  background-color: #ddd; /* Gray background for the full bar length */
  overflow: hidden;
  position: relative;
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
    background-color: #s;
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