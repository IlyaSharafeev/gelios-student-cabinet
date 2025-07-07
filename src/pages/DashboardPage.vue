<script setup lang="ts">
import { useI18n } from "vue-i18n";

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

const { t } = useI18n();
</script>

<template>
  <div class="dashboard">
    <div class="header">
      <div class="welcome-message">
        <div class="text">
          {{ t('dashboard.greeting') }}, Оксана
        </div>
        <div class="pencil-background"></div>
      </div>
      <div class="profile">
        <div class="notification-wrapper cursor-pointer">
          <div class="notification"></div>
        </div>
        <div class="profile-image cursor-pointer"></div>
      </div>
    </div>
    <div class="main">
      <div class="content-left">
        <div class="statistic">
          <div class="statistic_title">
            {{ t('dashboard.statistics.title') }}
          </div>
          <div class="statistic_blocks">
            <div v-for="(stat, index) in statistics" :key="index" class="statistic_block" :class="`statistic_block--${stat.description_key}`">
              <div class="statistic_block-title">{{ stat.title }}</div>
              <div class="statistic_block-description">{{ t(`dashboard.statistics.${stat.description_key}`) }}</div>
            </div>
          </div>
        </div>
        <div class="homework">
          <div class="homework__title">{{ t('dashboard.homework.title') }}</div>
          <div class="homework__items">
            <div v-for="(homework, index) in homeworks" :key="index" class="homework__item" :class="{ 'homework__item--overdue': homework.isOverdue }">
              <div class="name-student">{{ homework.studentName }}</div>
              <div class="name-trainer">{{ homework.trainerName }}</div>
              <div class="homework-date">{{ homework.date }}</div>
            </div>
          </div>
          <router-link to="homework" class="button btn-watch-all">{{ t('dashboard.view_all') }}</router-link>
        </div>
      </div>
      <div class="content-right">
        <div class="upcoming-classes">
          <div class="upcoming-classes__title">{{ t('dashboard.upcoming_classes.title') }}</div>
          <div class="upcoming-classes__items">
            <div v-for="(item, index) in upcomingClasses" :key="index" class="upcoming-classes__item">
              <div class="upcoming-classes__item-name">{{ item.name }}</div>
              <div class="upcoming-classes__item-date">{{ item.date }}</div>
              <div class="upcoming-classes__item-icon"></div>
            </div>
          </div>
        </div>
        <router-link to="schedule" class="button btn-watch-all">{{ t('dashboard.view_all') }}</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/mixins/mixins-media" as *;

.dashboard {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .welcome-message {
      display: flex;
      gap: 23px;
      position: relative;

      .text {
        font-family: "Onest", sans-serif;
        font-weight: 500;
        font-size: 50px;
        line-height: 115%;
        letter-spacing: -2%;
        color: #ffffff;
      }

      .pencil-background {
        position: absolute;
        top: -133px;
        right: -350px;
        background-image: url("@/assets/backgrounds/pencil.svg");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        width: 284px;
        height: 243px;
        display: none;
      }
    }

    .profile {
      display: flex;
      align-items: center;
      gap: 20px;

      .notification-wrapper {
        background-color: #ffffff;
        padding: 18px;
        border-radius: 18px;

        .notification {
          width: 32px;
          height: 32px;
          background-image: url('@/assets/images/icons/bell.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      }

      .profile-image {
        width: 80px;
        height: 80px;
        background-image: url('@/assets/images/pages/dashboard/profile-logo.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
  }

  .main {
    display: flex;
    gap: 20px;
    margin-top: 60px;

    .content-left {
      flex: 2;
      min-height: 400px;
      border-radius: 12px;

      .statistic {
        border-radius: 12px;
        backdrop-filter: blur(12px);
        background: #FFFFFF82;
        border-radius: 28px;
        padding: 24px;
        max-height: 251px;

        .statistic_title {
          font-family: "Onest", sans-serif;
          font-weight: 500;
          font-size: 20px;
          line-height: 100%;
          letter-spacing: 0%;
          color: #2C2C3A;
        }

        .statistic_blocks {
          margin-top: 24px;
          display: flex;
          gap: 16px;
        }

        .statistic_block {
          background-color: #ffffff;
          padding: 24px;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          width: 224px;

          .statistic_block-title {
            font-family: "Onest", sans-serif;
            font-weight: 500;
            font-size: 60px;
            line-height: 100%;
            letter-spacing: -2%;
            color: #0066ff;
          }

          .statistic_block-description {
            font-family: "Onest", sans-serif;
            font-weight: 500;
            font-size: 18px;
            line-height: 100%;
            letter-spacing: 0%;
            color: #30303d;
            opacity: 0.5;
          }

          &--students_count {
            .statistic_block-title {
              color: #0066FF;
            }
          }

          &--homework_count {
            .statistic_block-title {
              color: #1FAC08;
            }
          }

          &--lessons_count {
            .statistic_block-title {
              color: #FF7B7B;
            }
          }
        }
      }

      .homework {
        margin-top: 22px;
        border-radius: 12px;
        backdrop-filter: blur(12px);
        background: #FFFFFF82;
        border-radius: 28px;
        padding: 24px;

        .homework__title {
          font-family: "Onest", sans-serif;
          font-weight: 500;
          font-size: 20px;
          line-height: 100%;
          letter-spacing: 0%;
          color: #2C2C3A;
          margin-bottom: 24px;
        }

        .homework__items {
          display: flex;
          gap: 16px;
          flex-direction: column;
          margin-top: 24px;
          padding: 22px 24px 30px;
          background-color: #f5f5f5;
          border-radius: 24px;
        }

        .homework__item {
          display: flex;
          align-items: center;
          gap: 16px;
          border-radius: 12px;

          .name-student {
            flex: 1;
            font-family: "Onest", sans-serif;
            font-weight: 400;
            font-size: 18px;
            line-height: 100%;
            letter-spacing: 0%;
            color: #30303d;
          }

          .name-trainer {
            flex: 1;
            font-family: "Onest", sans-serif;
            font-weight: 400;
            font-size: 18px;
            line-height: 100%;
            letter-spacing: 0%;
            text-align: center;
            color: #30303d;
          }

          .homework-date {
            flex: 1;
            font-family: "Onest", sans-serif;
            font-weight: 500;
            font-size: 18px;
            line-height: 121%;
            letter-spacing: 0%;
            color: #0066ff;
            text-align: right;
          }

          &--overdue {
            .name-student,
            .name-trainer,
            .homework-date {
              color: #ff7b7b;
            }
          }
        }
      }

      .btn-watch-all {
        margin-top: 32px;
      }
    }

    .content-right {
      flex: 1;
      min-height: 400px;
      border-radius: 12px;
      backdrop-filter: blur(12px);
      background: #FFFFFF82;
      border-radius: 28px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .upcoming-classes {
        border-radius: 12px;

        .upcoming-classes__title {
          font-family: "Onest", sans-serif;
          font-weight: 500;
          font-size: 20px;
          line-height: 100%;
          letter-spacing: 0%;
          color: #2C2C3A;
          margin-bottom: 24px;
        }

        .upcoming-classes__items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .upcoming-classes__item {
          border-radius: 24px;
          background-color: #ffffff;
          padding: 16px;
          display: flex;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

          .upcoming-classes__item-name {
            flex: 1;
            font-family: "Onest", sans-serif;
            font-weight: 400;
            font-size: 18px;
            line-height: 100%;
            letter-spacing: 0%;
            color: #30303d;
          }

          .upcoming-classes__item-date {
            flex: 1;
            font-family: "Onest", sans-serif;
            font-weight: 500;
            font-size: 18px;
            line-height: 121%;
            letter-spacing: 0%;
            color: #0066ff;
            text-align: center;
          }

          .upcoming-classes__item-icon {
            cursor: pointer;
            width: 24px;
            height: 24px;
            margin-left: 12px;
            background-image: url('@/assets/images/icons/external-link.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
        }
      }

      .btn-watch-all {
        width: 100%;
        margin-top: 32px;
    }
  }}
}

@include media-max(desktop) {
  .dashboard {
    padding: 32px;

    .main  {
      display: flex;
      flex-direction: column;
    }

    .header {
      .welcome-message {
        .text {
          font-family: "Onest", sans-serif;
          font-size: 40px;
        }
      }

      .profile {
        .notification-wrapper {
          .notification {
            /* Font not applicable */
          }
        }

        .profile-image {
          /* Font not applicable */
        }
      }
    }

    .content-left {
      .statistic {
        .statistic_title {
          font-family: "Onest", sans-serif;
          font-size: 20px;
        }

        .statistic_blocks {
          .statistic_block {
            .statistic_block-title {
              font-family: "Onest", sans-serif;
              font-size: 44px;
            }

            .statistic_block-description {
              font-family: "Onest", sans-serif; /* Update font here */
              font-size: 16px; /* Adjust as needed */
            }

            &--students_count {
              .statistic_block-title {
                font-family: "Onest", sans-serif; /* Update font here */
              }
            }

            &--homework_count {
              .statistic_block-title {
                font-family: "Onest", sans-serif; /* Update font here */
              }
            }

            &--lessons_count {
              .statistic_block-title {
                font-family: "Onest", sans-serif; /* Update font here */
              }
            }
          }
        }
      }

      .homework {
        .homework__title {
          font-family: "Onest", sans-serif; /* Update font here */
          font-size: 18px; /* Adjust as needed */
        }

        .homework__items {
          .homework__item {
            .name-student {
              font-family: "Onest", sans-serif; /* Update font here */
              font-size: 16px; /* Adjust as needed */
            }

            .name-trainer {
              font-family: "Onest", sans-serif; /* Update font here */
              font-size: 16px; /* Adjust as needed */
            }

            .homework-date {
              font-family: "Onest", sans-serif; /* Update font here */
              font-size: 16px; /* Adjust as needed */
            }

            &--overdue {
              .name-student,
              .name-trainer,
              .homework-date {
                font-family: "Onest", sans-serif; /* Update font here */
              }
            }
          }
        }

        .btn-watch-all {
          font-family: "Onest", sans-serif; /* Update font here */
          font-size: 16px; /* Adjust as needed */
        }
      }
    }

    .content-right {
      .upcoming-classes {
        .upcoming-classes__title {
          font-family: "Onest", sans-serif; /* Update font here */
          font-size: 18px; /* Adjust as needed */
        }

        .upcoming-classes__items {
          .upcoming-classes__item {
            .upcoming-classes__item-name {
              font-family: "Onest", sans-serif; /* Update font here */
              font-size: 16px; /* Adjust as needed */
            }

            .upcoming-classes__item-date {
              font-family: "Onest", sans-serif; /* Update font here */
              font-size: 16px; /* Adjust as needed */
            }

            .upcoming-classes__item-icon {
              /* Font not applicable */
            }
          }
        }
      }

      .btn-watch-all {
        font-family: "Onest", sans-serif; /* Update font here */
        font-size: 16px; /* Adjust as needed */
      }
    }
  }
}
</style>