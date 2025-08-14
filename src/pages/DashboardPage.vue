<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import {useI18n} from "vue-i18n";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useAuthStore} from "@/stores/auth";

interface Course {
  title: string;
  teacher: string;
  progress: string;
  total: string;
  isLocked: boolean;
  progressColor: string;
}

const authStore = useAuthStore();
const {t} = useI18n();

const studentName = computed(() => authStore.user?.first_name || '...');
const studentCoins = computed(() => authStore.user?.coins || 0);

const courses = computed((): Course[] => {
  // Обрабатываем активные курсы из authStore.user.active_courses
  const activeCourses = authStore.user?.active_courses?.map((course: any): Course => {
    const totalLessons = course.lessons_base + course.lessons_extra;
    const progressPercentage = totalLessons > 0 ? course.lessons_completed / totalLessons : 0;

    const teacherName = course.teacher_last_name && course.teacher_first_name && course.teacher_patronymic
        ? `${course.teacher_last_name} ${course.teacher_first_name.charAt(0)}.${course.teacher_patronymic.charAt(0)}.`
        : 'Не назначен';

    return {
      title: course.direction.name_uk,
      teacher: teacherName,
      progress: String(course.lessons_completed),
      total: String(totalLessons),
      isLocked: false,
      progressColor: progressPercentage < 0.25 ? 'red' : 'green',
    };
  }) || [];

  // Обрабатываем неактивные (заблокированные) курсы из authStore.user.inactive_courses
  const lockedCourses: Course[] = authStore.user?.inactive_courses?.map((course: any): Course => ({
    title: course.name_uk,
    teacher: "",
    progress: "",
    total: "",
    isLocked: true,
    progressColor: ''
  })) || [];

  // Объединяем оба массива для отображения
  return [...activeCourses, ...lockedCourses];
});


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

onMounted(() => {
  if (!authStore.user) {
    authStore.fetchProfile();
  }

  AOS.init({
    duration: 800,
    once: false,
  });
});
</script>

<template>
  <div class="dashboard">
    <div class="dashboard__columns">
      <div class="dashboard__column dashboard__column--direction">
        <div class="dashboard__direction-title" data-aos="fade-right"> {{ t('dashboard.greeting') }}, {{ studentName }}
        </div>
        <div class="dashboard__direction-content-wrapper">
          <div class="dashboard__scroll-buttons">
            <button class="dashboard__scroll-button dashboard__scroll-button--up" @click="scrollUp">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 18L14 11L7 18" stroke="#463B00" stroke-width="3" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="dashboard__scroll-button dashboard__scroll-button--down" @click="scrollDown">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 11L14 18L21 11" stroke="#463B00" stroke-width="3" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="dashboard__direction-directions" ref="coursesContainer" data-aos="fade-up">
            <div
                v-for="(course, index) in courses"
                :key="index"
                :class="['dashboard__course-block', { 'dashboard__course-block--locked': course.isLocked }]"
            >
              <div class="dashboard__course-block-content"
                   :class="{'dashboard__course-block-content--locked': course.isLocked}">
                <h4 class="dashboard__course-block-title">{{ course.title }}</h4>
                <div v-if="!course.isLocked" class="dashboard__course-block-details-wrapper">
                  <div class="dashboard__course-block-details">
                    <span class="dashboard__course-block-teacher">{{ course.teacher }}</span>
                    <span class="dashboard__course-block-label">{{ t('dashboard.teacher_label') }}</span>
                  </div>
                  <div
                      :class="['dashboard__course-block-progress', `dashboard__course-block-progress--${course.progressColor}`]">
                    {{ course.progress }}/{{ course.total }}
                  </div>
                </div>
                <div v-else class="dashboard__course-block-lock-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M28.3337 16.6667V13.3333C28.3337 8.73096 24.6027 5 20.0003 5C15.398 5 11.667 8.73096 11.667 13.3333V16.6667M20.0003 24.1667V27.5M14.667 35H25.3337C28.1339 35 29.5341 35 30.6036 34.455C31.5444 33.9757 32.3093 33.2108 32.7887 32.27C33.3337 31.2004 33.3337 29.8003 33.3337 27V24.6667C33.3337 21.8664 33.3337 20.4663 32.7887 19.3967C32.3093 18.4559 31.5444 17.691 30.6036 17.2116C29.5341 16.6667 28.1339 16.6667 25.3337 16.6667H14.667C11.8667 16.6667 10.4666 16.6667 9.39704 17.2116C8.45623 17.691 7.69133 18.4559 7.21196 19.3967C6.66699 20.4663 6.66699 21.8664 6.66699 24.6667V27C6.66699 29.8003 6.66699 31.2004 7.21196 32.27C7.69133 33.2108 8.45623 33.9757 9.39704 34.455C10.4666 35 11.8667 35 14.667 35Z"
                        stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard__column dashboard__column--notification-wrapper">
        <div class="dashboard__notification" data-aos="zoom-in" data-aos-delay="200"> {{ t('dashboard.quote') }}
        </div>
      </div>
      <div class="dashboard__column dashboard__column--coins-wrapper">
        <div class="dashboard__coins" data-aos="fade-left" data-aos-delay="400">
          <div class="dashboard__coins-icon">
            <svg width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M15.4299 32.0846C12.339 32.0846 9.70604 31.4389 7.53095 30.1475C5.35587 28.8273 3.69594 27.005 2.55116 24.6804C1.40638 22.3271 0.833984 19.5864 0.833984 16.4583C0.833984 14.1337 1.1488 12.0243 1.77843 10.1302C2.43668 8.20741 3.38112 6.55724 4.61176 5.17971C5.87102 3.80218 7.40217 2.75468 9.2052 2.03721C11.0082 1.29105 13.0545 0.917969 15.3441 0.917969C17.6623 0.917969 19.7372 1.29105 21.5688 2.03721C23.4005 2.78338 24.9173 3.90262 26.1193 5.39495C27.35 6.85858 28.1513 8.69528 28.5234 10.9051H22.2986C22.0697 9.95802 21.6547 9.18316 21.0537 8.58049C20.4527 7.94912 19.6943 7.4756 18.7784 7.15991C17.8912 6.84423 16.8752 6.68639 15.7304 6.68639C14.1564 6.68639 12.8256 6.95902 11.738 7.50429C10.6505 8.04957 9.76328 8.79573 9.07641 9.74278C8.41816 10.6611 7.93163 11.723 7.61681 12.9283C7.33062 14.105 7.18752 15.3247 7.18752 16.5874C7.18752 18.3093 7.47372 19.9164 8.04611 21.4088C8.6185 22.8724 9.52001 24.0634 10.7507 24.9817C11.9813 25.8714 13.6126 26.3162 15.6446 26.3162C16.9897 26.3162 18.1774 26.1153 19.2077 25.7135C20.2666 25.2831 21.1109 24.6517 21.7406 23.8194C22.3988 22.9585 22.7709 21.9253 22.8567 20.72H14.5714V15.4251H29.1673V17.104C29.1673 20.2034 28.6522 22.8724 27.6219 25.1109C26.5916 27.3494 25.0604 29.0713 23.0284 30.2766C20.9964 31.482 18.4636 32.0846 15.4299 32.0846Z"
                  fill="#D2BB3F"/>
            </svg>
          </div>
          <div class="dashboard__coins-content">
            <div class="dashboard__coins-content-number">{{ studentCoins }}</div>
            <div class="dashboard__coins-content-text">{{ t('dashboard.balance') }}</div>
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
  padding-top: 35px;
  min-height: 100vh;
  width: 100%;
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
  border-radius: 14px;
  width: 36px;
  height: 36px;
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
    padding-bottom: 3px;
  }
}

.dashboard__direction-directions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1;
  overflow-y: scroll;
  max-height: calc(100vh - 150px);
  padding-right: 50px;
  box-sizing: border-box;
  padding-bottom: 130px;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
}

.dashboard__course-block-details-wrapper {
  display: flex;
  gap: 31px;
  justify-content: space-between;
  width: 100%;
}

.dashboard__course-block {
  background-color: #ffffff;
  border-radius: 28px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  &--locked {
    background: #3968BD80;
    color: #FFFFFF;
    opacity: 70%;
    backdrop-filter: blur(20px);

    .dashboard__course-block-title {
      color: #FFFFFF;
    }
  }

  &-content {
    flex-grow: 1;
    display: flex;
    gap: 24px;
    flex-direction: column;
    align-items: flex-start;

    &--locked {
      flex-direction: row;
      align-items: center;
    }
  }

  &-title {
    font-weight: bold;
    font-size: 1.3em;
    margin-bottom: 5px;
    color: #333;
    font-family: Onest;
    font-weight: 500;
    font-size: 24px;
    line-height: 105%;
    letter-spacing: 0%;
  }

  &-details {
    font-size: 0.9em;
    color: #777;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  &-teacher {
    margin-right: 5px;
    color: #30303D;
    font-family: Onest;
    font-weight: 500;
    font-style: Medium;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0%;
  }

  &-label {
    opacity: 70%;
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0%;
  }

  &-progress {
    font-weight: bold;
    font-family: Onest;
    font-weight: 500;
    font-style: Medium;
    font-size: 28px;
    line-height: 121%;
    letter-spacing: 0%;


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
      font-weight: 600;
      font-style: Regular;
      letter-spacing: 2px;
      font-size: 16px;
      line-height: 121%;
      letter-spacing: 0%;
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