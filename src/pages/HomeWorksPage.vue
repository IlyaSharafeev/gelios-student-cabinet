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
  const ua = { 'а':'a','б':'b','в':'v','г':'h','ґ':'g','д':'d','е':'e','є':'ie','ж':'zh','з':'z','и':'y','і':'i','ї':'i','й':'i','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ь':'','ю':'iu','я':'ia' };
  return text.toLowerCase().trim()
      .replace(/[а-яґєїі]/g, (match) => ua[match as keyof typeof ua])
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

// Current date for setting due dates relative to now
const now = new Date('2025-07-08T17:31:00Z'); // Hardcoded current time for consistent results based on prompt context

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
    title: 'Знайди пару',
    initialType: 'accept',
    currentType: 'perform', // Already accepted
    createdAt: new Date(now.getTime() - 10 * 60 * 60 * 1000).toISOString(), // Assigned 10 hours ago
    dueDate: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(), // Was due 1 hour ago (for overdue example)
    acceptedAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(), // Accepted 8 hours ago
    rewards: 32,
    ...getTrainerInfo('Знайди пару'),
  },
]);

const formatTimeRemaining = (ms: number): string => {
  if (ms < 0) {
    ms = Math.abs(ms);
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `Прострочено на ${days} дні(в)`;
    if (hours > 0) return `Прострочено на ${hours} годи(н)`;
    if (minutes > 0) return `Прострочено на ${minutes} хвили(н)`;
    return `Прострочено на ${seconds} секунди(н)`;
  }

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `Залишилось ${days} дні(в)`;
  if (hours > 0) return `Залишилось ${hours} годи(н)`;
  if (minutes > 0) return `Залишилось ${minutes} хвили(н)`;
  return `Залишилось ${seconds} секунди(н)`;
};

const calculateTimeRemaining = (isoDueDateString: string) => {
  const now = new Date();
  const dueDate = new Date(isoDueDateString);
  return dueDate.getTime() - now.getTime();
};

const calculateTimeSinceAcceptance = (isoAcceptedAtString: string) => {
  const now = new Date();
  const acceptedAt = new Date(isoAcceptedAtString);
  return now.getTime() - acceptedAt.getTime();
};

const timers = ref<{ [key: number]: string }>({});
let interval: number;

const updateTimers = () => {
  homeworks.value.forEach(hw => {
    if (hw.acceptedAt) {
      timers.value[hw.id] = `Прийнято: ${formatTimeRemaining(-calculateTimeSinceAcceptance(hw.acceptedAt))}`; // Display how long ago it was accepted
    } else {
      timers.value[hw.id] = formatTimeRemaining(calculateTimeRemaining(hw.dueDate));
    }
  });
};

const handleHomeworkAction = (homework: Homework) => {
  if (homework.currentType === 'accept') {
    // Logic for accepting homework
    homework.acceptedAt = new Date().toISOString();
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
</script>

<template>
  <div class="homeworks-page">
    <div class="homework-list">
      <div v-for="homework in homeworks" :key="homework.id" class="homework-item">
        <div class="homework-icon">
          <img :src="homework.iconImage" :alt="homework.title" class="icon-image" />
        </div>
        <div class="homework-details">
          <div class="homework-title">{{ homework.title }}</div>
          <div class="homework-time">
            <span v-if="homework.acceptedAt">Час прийняття:</span>
            <span v-else>Час на прийняття:</span>
            <span class="time-value">{{ timers[homework.id] }}</span>
            <div
                class="time-bar"
                :class="{
                  'red-bar': homework.currentType === 'perform' && !homework.acceptedAt && calculateTimeRemaining(homework.dueDate) < 0,
                  'blue-bar': homework.currentType === 'accept' || homework.acceptedAt || calculateTimeRemaining(homework.dueDate) >= 0
                }"
                :style="{ width: homework.acceptedAt ? '100%' : (Math.max(0, 1 - calculateTimeRemaining(homework.dueDate) / (new Date(homework.dueDate).getTime() - new Date(homework.createdAt).getTime())) * 100) + '%' }"
            ></div>
          </div>
          <div class="homework-rewards">
            Винагороди <span class="reward-value">G +{{ homework.rewards }}</span>
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
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  min-height: 92px;

  &:nth-child(odd) {
    background-image: linear-gradient(to right, #e0f7fa, #ffffff);
  }
  &:nth-child(even) {
    background-image: linear-gradient(to right, #e8f5e9, #ffffff);
  }
}

.homework-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f0f0f0; // Neutral background for images
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: white;
  margin-right: 15px;
  flex-shrink: 0;
  overflow: hidden; // Ensure image fits within the circle

  .icon-image {
    width: 100%;
    height: 100%;
    object-fit: cover; // Cover the circle area
  }
}

.homework-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative; // For positioning the button
}

.homework-title {
  font-size: 1.1em;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.homework-time {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9em;
  color: #555;
  margin-bottom: 10px;
  position: relative; // For the time bar
}

.time-value {
  font-weight: bold;
  color: #000;
}

.time-bar {
  position: absolute;
  bottom: -5px; // Adjust as needed
  left: 0;
  width: 70%; // Default width for "Час на прийняття"
  height: 5px;
  border-radius: 3px;
  background-color: #ddd; // Default grey

  &.blue-bar {
    background-color: #2196F3; // Blue
  }

  &.red-bar {
    background-color: #F44336; // Red
  }
}

.homework-rewards {
  font-size: 0.9em;
  color: #555;
  margin-bottom: 10px;
}

.reward-value {
  font-weight: bold;
  color: #4CAF50; // Green for rewards
}

.homework-button {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  font-size: 0.9em;
  min-width: 90px;
  text-align: center;

  &.blue {
    background-color: #2196F3; // Blue button for "Прийняти"
    &:hover {
      background-color: #1976D2;
    }
  }

  &.red {
    background-color: #F44336; // Red button for "Виконати"
    &:hover {
      background-color: #D32F2F;
    }
  }
}
</style>