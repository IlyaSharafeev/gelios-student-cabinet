<script setup lang="ts">
import { ref, onMounted } from 'vue'; // Import onMounted
import { useI18n } from "vue-i18n";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

interface Statistic {
  title: string;
  description_key: string;
}

interface UpcomingClass {
  name: string;
  date: string;
}

interface Homework {
  studentName: string;
  trainerName: string;
  date: string;
  isOverdue: boolean;
}

interface Course {
  title: string;
  teacher: string;
  progress: string;
  total: string;
  isLocked: boolean;
  progressColor: string;
}

const statistics: Statistic[] = [
  { title: "74", description_key: "students_count" },
  { title: "315", description_key: "homework_count" },
  { title: "213", description_key: "lessons_count" }
];

const upcomingClasses: UpcomingClass[] = [
  { name: "Засядько I.О.", date: "12.01 10:00" },
  { name: "Азарко А.Б.", date: "12.01 11:30" },
  { name: "Кличко I.У.", date: "12.01 14:00" },
  { name: "Засядько I.О.", date: "12.01 14:00" },
  { name: "Азарко А.Б.", date: "12.01 14:00" },
  { name: "Азарко А.Б.", date: "12.01 14:00" },
];

const homeworks: Homework[] = [
  { studentName: "Засядько I.О.", trainerName: "Кіберкiшка", date: "30 Вересня 12:30", isOverdue: true },
  { studentName: "Кличко I.У.", trainerName: "Знайди слово", date: "1 Жовтня 14:30", isOverdue: false },
  { studentName: "Азарко А.Б.", trainerName: "Кіберкiшка", date: "3 Жовтня 12:30", isOverdue: false }
];

const courses: Course[] = [
  { title: "Швидкочитання", teacher: "Засядько I.О.", progress: "12", total: "48", isLocked: false, progressColor: 'green' },
  { title: "Математика", teacher: "Стефак М.С.", progress: "7", total: "24", isLocked: false, progressColor: 'green' },
  { title: "Ментальна арифметика", teacher: "", progress: "", total: "", isLocked: true, progressColor: '' },
  { title: "Українська мова", teacher: "", progress: "", total: "", isLocked: true, progressColor: '' },
  { title: "Українська мова", teacher: "Засядько I.О.", progress: "1", total: "48", isLocked: false, progressColor: 'red' },
  { title: "Історія України", teacher: "Петренко О.П.", progress: "5", total: "10", isLocked: false, progressColor: 'green' },
  { title: "Фізика", teacher: "", progress: "", total: "", isLocked: true, progressColor: '' },
  { title: "Хімія", teacher: "Сидоренко В.В.", progress: "8", total: "15", isLocked: false, progressColor: 'green' },
];

const { t } = useI18n();

const coursesContainer = ref<HTMLElement | null>(null);

const scrollAmount = 150;

const scrollUp = () => {
  if (coursesContainer.value) {
    coursesContainer.value.scrollBy({
      top: -scrollAmount,
      behavior: 'smooth'
    });
  }
};

const scrollDown = () => {
  if (coursesContainer.value) {
    coursesContainer.value.scrollBy({
      top: scrollAmount,
      behavior: 'smooth'
    });
  }
};

// Initialize AOS when the component is mounted
onMounted(() => {
  AOS.init({
    // Optional: Add your AOS configuration here
    duration: 800, // values from 0 to 3000, with step 50ms
    once: false, // whether animation should happen only once - while scrolling down
  });
});
</script>

<template>
  <div class="dashboard">
    <div class="dashboard__columns">
      <div class="dashboard__column dashboard__column--direction">
        <div class="dashboard__direction-title" data-aos="fade-right"> Доброго ранку, Остап
        </div>
        <div class="dashboard__direction-content-wrapper">
          <div class="dashboard__scroll-buttons">
            <button class="dashboard__scroll-button dashboard__scroll-button--up" @click="scrollUp">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 18L14 11L7 18" stroke="#463B00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="dashboard__scroll-button dashboard__scroll-button--down" @click="scrollDown">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 11L14 18L21 11" stroke="#463B00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="dashboard__direction-directions" ref="coursesContainer">
            <div
                v-for="(course, index) in courses"
                :key="index"
                :class="['dashboard__course-block', { 'dashboard__course-block--locked': course.isLocked }]"
                data-aos="fade-up" :data-aos-delay="index * 50" >
              <div class="dashboard__course-block-content">
                <h4 class="dashboard__course-block-title">{{ course.title }}</h4>
                <div v-if="!course.isLocked" class="dashboard__course-block-details">
                  <span class="dashboard__course-block-teacher">{{ course.teacher }}</span>
                  <span class="dashboard__course-block-label">вчитель</span>
                </div>
                <div v-if="!course.isLocked" :class="['dashboard__course-block-progress', `dashboard__course-block-progress--${course.progressColor}`]">
                  {{ course.progress }}/{{ course.total }}
                </div>
                <div v-else class="dashboard__course-block-lock-icon">
                  🔒
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard__column dashboard__column--notification-wrapper">
        <div class="dashboard__notification" data-aos="zoom-in" data-aos-delay="200"> У кожного є внутрішнє сонце. Дозвольте йому сяяти!
        </div>
      </div>
      <div class="dashboard__column dashboard__column--coins-wrapper">
        <div class="dashboard__coins" data-aos="fade-left" data-aos-delay="400"> <div class="dashboard__coins-icon">
          <svg width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4299 32.0846C12.339 32.0846 9.70604 31.4389 7.53095 30.1475C5.35587 28.8273 3.69594 27.005 2.55116 24.6804C1.40638 22.3271 0.833984 19.5864 0.833984 16.4583C0.833984 14.1337 1.1488 12.0243 1.77843 10.1302C2.43668 8.20741 3.38112 6.55724 4.61176 5.17971C5.87102 3.80218 7.40217 2.75468 9.2052 2.03721C11.0082 1.29105 13.0545 0.917969 15.3441 0.917969C17.6623 0.917969 19.7372 1.29105 21.5688 2.03721C23.4005 2.78338 24.9173 3.90262 26.1193 5.39495C27.35 6.85858 28.1513 8.69528 28.5234 10.9051H22.2986C22.0697 9.95802 21.6547 9.18316 21.0537 8.58049C20.4527 7.94912 19.6943 7.4756 18.7784 7.15991C17.8912 6.84423 16.8752 6.68639 15.7304 6.68639C14.1564 6.68639 12.8256 6.95902 11.738 7.50429C10.6505 8.04957 9.76328 8.79573 9.07641 9.74278C8.41816 10.6611 7.93163 11.723 7.61681 12.9283C7.33062 14.105 7.18752 15.3247 7.18752 16.5874C7.18752 18.3093 7.47372 19.9164 8.04611 21.4088C8.6185 22.8724 9.52001 24.0634 10.7507 24.9817C11.9813 25.8714 13.6126 26.3162 15.6446 26.3162C16.9897 26.3162 18.1774 26.1153 19.2077 25.7135C20.2666 25.2831 21.1109 24.6517 21.7406 23.8194C22.3988 22.9585 22.7709 21.9253 22.8567 20.72H14.5714V15.4251H29.1673V17.104C29.1673 20.2034 28.6522 22.8724 27.6219 25.1109C26.5916 27.3494 25.0604 29.0713 23.0284 30.2766C20.9964 31.482 18.4636 32.0846 15.4299 32.0846Z" fill="#D2BB3F"/>
          </svg>
        </div>
          <div class="dashboard__coins-content">
            <div class="dashboard__coins-content-number">93645</div>
            <div class="dashboard__coins-content-text">баланс</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/mixins/mixins-media" as *;

.dashboard {
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard__columns {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.dashboard__column {
  min-width: 280px;
  padding: 20px;
  border-radius: 8px;

  &--direction {
    flex: 2;
    background-color: transparent;
    display: flex;
    flex-direction: column;
  }

  &--notification-wrapper,
  &--coins-wrapper {
    flex: 1;
  }
}

.dashboard__direction-title {
  font-family: "Onest", sans-serif;
  font-weight: 500;
  font-size: 60px;
  line-height: 1.15;
  letter-spacing: -2%;
  color: #ffffff;
  margin-bottom: 20px;
  position: relative;
}

.dashboard__direction-content-wrapper {
  display: flex;
  flex-grow: 1;
  position: relative;
}

.dashboard__scroll-buttons {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 10;
}

.dashboard__scroll-button {
  background-color: #ffd700;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: darken(#ffd700, 10%);
  }

  svg {
    padding-left: 3px;
    padding-bottom: 3px;
  }
}

.dashboard__direction-directions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1;
  overflow-y: scroll;
  max-height: calc(100vh - 250px);
  padding-right: 50px;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.dashboard__course-block {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  &--locked {
    background-color: #d1e7fd;
    color: #000;
    .dashboard__course-block-title {
      color: #000;
    }
  }

  &-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &-title {
    font-weight: bold;
    font-size: 1.3em;
    margin-bottom: 5px;
    color: #333;
  }

  &-details {
    font-size: 0.9em;
    color: #777;
    margin-bottom: 10px;
  }

  &-teacher {
    margin-right: 5px;
  }

  &-progress {
    font-weight: bold;
    font-size: 1.2em;

    &--green {
      color: #4CAF50;
    }
    &--red {
      color: #F44336;
    }
  }

  &-lock-icon {
    font-size: 2em;
    color: #555;
    margin-left: auto;
  }
}

.dashboard__notification {
  font-size: 22px;
  padding: 20px;
  background-color: #FFFFFF;
  border-radius: 24px;
  position: relative;
  font-family: Onest;
  font-weight: 400;
  font-style: Regular;
  line-height: 121%;
  letter-spacing: 0%;


  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #e0f7fa;
  }
}

.dashboard__coins {
  display: flex;
  gap: 10px;
  padding: 28px 32px;
  background: #FF7B7B;
  border-radius: 32px;

  &-icon {
    width: 40px;
    height: 40px;
    background: #FFDF39;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &-content {
    color: #FFFFFF;
    &-number {
      font-size: 40px;
      font-weight: bold;
      font-family: Onest;
      font-weight: 400;
      font-style: Regular;
      line-height: 121%;
      letter-spacing: 0%;

    }
    &-text {
      font-family: Onest;
      font-weight: 400;
      font-style: Regular;
      font-size: 16px;
      leading-trim: NONE;
      line-height: 121%;
      letter-spacing: 0%;
      opacity: 0.5;
    }
  }
}

@include media-max(desktop) {
  .dashboard {
    padding: 32px;
  }
  .dashboard__columns {
    gap: 16px;

    .dashboard__column {
      &--direction,
      &--notification-wrapper,
      &--coins-wrapper {
        flex: 1;
      }
    }
  }
}

@include media-max(tablet) {
  .dashboard__column {
    flex-basis: 100%;
  }
  .dashboard__direction-directions {
    max-height: 400px;
    padding-right: 0;
  }
  .dashboard__scroll-buttons {
    position: static;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 10px;
  }
}
</style>