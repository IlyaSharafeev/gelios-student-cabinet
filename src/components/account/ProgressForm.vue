<script setup lang="ts">
// No specific reactive data needed for this static layout
</script>

<template>
  <div class="progress-form">
    <div class="top-section">
      <div class="language-period-card">
        <div class="language-info">
          <div class="header">
            <span class="language-name">Українська мова</span>
            <button class="dropdown-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="#5F6D7E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="details">
            <p>Навчання розпочато: 22.04.2025</p>
            <p>Проведено уроків: 22.04.2025</p>
          </div>
        </div>
        <div class="cat-image-wrapper">
          <div class="cat-image"></div>
        </div>
      </div>

      <div class="homework-card">
        <h3>Домашні завдання</h3>
        <div class="homework-stats">
          <div class="stat-item">
            <span>Видано</span>
            <span class="count issued">27</span>
            <div class="progress-bar-container">
              <div class="progress-bar issued-bar" style="width: 80%;"></div>
            </div>
          </div>
          <div class="stat-item">
            <span>Виконано</span>
            <span class="count completed">21</span>
            <div class="progress-bar-container">
              <div class="progress-bar completed-bar" style="width: 70%;"></div>
            </div>
          </div>
          <div class="stat-item">
            <span>Прийнято</span>
            <span class="count accepted">23</span>
            <div class="progress-bar-container">
              <div class="progress-bar accepted-bar" style="width: 90%;"></div>
            </div>
          </div>
          <div class="stat-item">
            <span>Не завершено</span>
            <span class="count incomplete">2</span>
            <div class="progress-bar-container">
              <div class="progress-bar incomplete-bar" style="width: 20%;"></div>
            </div>
          </div>
        </div>
        <div class="book-icon"></div>
      </div>
    </div>

    <div class="bottom-section">
      <div class="period-card">
        <div class="period-header">
          <span>Період</span>
        </div>
        <div class="period-dates">
          <span>06.08.25</span>
          <span class="arrow-right">→</span>
          <span>06.09.25</span>
        </div>
        <button class="change-period-button">Змінить Період</button>
        <div class="calendar-icon"></div>
      </div>

      <div class="skills-card">
        <h3>Навички</h3>
        <div class="skills-grid">
          <div class="skill-item">
            <span class="skill-name">Увага</span>
            <div class="skill-bars">
              <div class="skill-pill-background">
                <div class="skill-pill purple-light-pill" style="height: 50%;"></div>
              </div>
              <div class="skill-pill-background">
                <div class="skill-pill purple-dark-pill" style="height: 80%;"></div>
              </div>
            </div>
          </div>
          <div class="skill-item">
            <span class="skill-name">Логіка</span>
            <div class="skill-bars">
              <div class="skill-pill-background">
                <div class="skill-pill orange-light-pill" style="height: 60%;"></div>
              </div>
              <div class="skill-pill-background">
                <div class="skill-pill orange-dark-pill" style="height: 90%;"></div>
              </div>
            </div>
          </div>
          <div class="skill-item">
            <span class="skill-name">Пам'ять</span>
            <div class="skill-bars">
              <div class="skill-pill-background">
                <div class="skill-pill blue-light-pill" style="height: 40%;"></div>
              </div>
              <div class="skill-pill-background">
                <div class="skill-pill blue-dark-pill" style="height: 70%;"></div>
              </div>
            </div>
          </div>
          <div class="skill-item">
            <span class="skill-name">Концентрація</span>
            <div class="skill-bars">
              <div class="skill-pill-background">
                <div class="skill-pill pink-light-pill" style="height: 30%;"></div>
              </div>
              <div class="skill-pill-background">
                <div class="skill-pill pink-dark-pill" style="height: 85%;"></div>
              </div>
            </div>
          </div>
        </div>
        <p class="skills-note">*Графік постійно оновлюється, дані беруться зі статистики по виконанню тренажерів</p>
        <div class="pie-progress-bar"></div>
      </div>

      <div class="reading-girl-card">
        <div class="reading-girl-card-icon"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calendar-icon {
  position: absolute;
  top: -16px;
  right: -11px;
  background-image: url('@/assets/images/float-icon/calendar.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 71px;
  height: 77px;
}

.pie-progress-bar {
  position: absolute;
  top: -16px;
  right: -11px;
  background-image: url('@/assets/images/float-icon/pie-progress-bar.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 91px;
  height: 91px;
}

.book-icon {
  position: absolute;
  top: -26px;
  right: -12px;
  background-image: url('@/assets/images/float-icon/book.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 106px;
  height: 117px;
}

.progress-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.top-section, .bottom-section {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.language-period-card, .homework-card, .period-card, .skills-card, .reading-girl-card {
  background-color: #F8F8FC;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
}

.language-period-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  min-width: 300px; /* Adjust as needed */

  .language-info {
    flex-grow: 1;
    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
      .language-name {
        font-weight: 600;
        font-size: 18px;
      }
      .flag-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        object-fit: cover;
      }
      .dropdown-arrow {
        background: none;
        border: none;
        cursor: pointer;
      }
    }
    .details {
      font-size: 14px;
      color: #5F6D7E;
      p {
        margin: 5px 0;
      }
    }
  }
  
  .cat-image-wrapper {
    margin-top: 28px;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    
    .cat-image {
      background-image: url('@/assets/images/cats/air-cat.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 166px;
      height: 148px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}

.homework-card {
  position: relative;
  flex: 2;
  min-width: 400px; /* Adjust as needed */

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
  }

  .homework-stats {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 10px;

      span {
        flex-basis: 100px; /* Align labels */
      }

      .count {
        font-weight: 600;
        min-width: 30px;
        text-align: right;
      }

      .progress-bar-container {
        flex-grow: 1;
        height: 8px;
        background-color: #E0E0E0;
        border-radius: 4px;
        overflow: hidden;

        .progress-bar {
          height: 100%;
          border-radius: 4px;
        }

        .issued-bar { background-color: #0066FF; }
        .completed-bar { background-color: #4CAF50; }
        .accepted-bar { background-color: #FFC107; }
        .incomplete-bar { background-color: #FF7B7B; }
      }
    }
  }
}

.period-card {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 200px; /* Adjust as needed */

  .period-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    span {
      font-weight: 600;
      font-size: 18px;
    }

    .calendar-icon {
      width: 24px;
      height: 24px;
    }
  }

  .period-dates {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;

    .arrow-right {
      color: #A0A0A0;
    }
  }

  .change-period-button {
    background-color: #0066FF;
    color: #FFFFFF;
    border: none;
    padding: 10px 15px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
}

.skills-card {
  flex: 2;
  min-width: 450px; /* Adjust as needed */
  position: relative;

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
  }

  .skills-grid {
    display: flex;
    gap: 50px;

    .skill-item {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .skill-name {
        font-weight: 500;
        font-size: 15px;
      }

      .skill-bars {
        display: flex;
        align-items: flex-end; /* Aligns pills to the bottom of the container */
        height: 80px; /* Fixed height for the entire skill bar area to accommodate varying pill heights */
        gap: 4px; /* Gap between the two "pills" */
      }

      .skill-pill-background {
        position: relative; // For absolute positioning of inner pill
        width: 25px; /* Fixed width for each "pill" column */
        height: 100%; // Takes full height of skill-bars container
        background-color: #E0E0E0; /* Light grey background for the pill container */
        border-radius: 12px; /* Rounded corners for the "pill" background */
        overflow: hidden; /* Ensures the inner pill stays within rounded corners */
      }

      .skill-pill {
        position: absolute; // Positioned within skill-pill-background
        bottom: 0; // Starts from the bottom
        width: 100%; // Fills the width of its background container
        border-radius: 12px; /* Highly rounded corners for the "pill" shape */
        // Heights are set inline in template for demonstration, would be dynamic
      }

      /* Lighter shades for the "unfilled" portion pill */
      .purple-light-pill { background-color: #CFC4EE; }
      .orange-light-pill { background-color: #FDD9BF; }
      .blue-light-pill { background-color: #B1E1FA; }
      .pink-light-pill { background-color: #FBCBCD; }

      /* Darker shades for the "filled" portion pill */
      .purple-dark-pill { background-color: #9B51E0; }
      .orange-dark-pill { background-color: #F2994A; }
      .blue-dark-pill { background-color: #2D9CDB; }
      .pink-dark-pill { background-color: #EB5757; }
    }
  }

  .pie-chart-placeholder {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 60px; /* Size of the icon */
    height: 60px; /* Size of the icon */
    border-radius: 50%;
    background-color: #FFECB3; /* Background color for the circle */
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 70%;
      height: 70%;
      object-fit: contain;
    }
  }

  .skills-note {
    font-size: 12px;
    color: #5F6D7E;
    margin-top: 20px;
    text-align: left;
  }
}

.reading-girl-card {
  flex: 1;
  min-width: 180px; /* Adjust as needed */
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Align image to bottom */
  overflow: hidden; /* Hide overflow if image is too big */
  padding: 0; /* Remove padding for image to fill */

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .reading-girl-card-icon {
    background-image: url('@/assets/images/float-icon/girl-with-book-princess.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 182px;
    height: 324px;
  }
}
</style>