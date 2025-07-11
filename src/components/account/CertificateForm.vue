<script setup lang="ts">
// Dummy data for certificates to display them
const certificates = [
  { id: 1, title: 'Друк', image: '/path/to/certificate-1.png' },
  { id: 2, title: 'Базовий', image: '/path/to/certificate-2.png' },
  { id: 3, title: 'Основний', image: '/path/to/certificate-3.png' },
  { id: 4, title: 'Просунутий', image: '/path/to/certificate-4.png' },
  { id: 5, title: 'Експерт', image: '/path/to/certificate-5.png' },
  { id: 6, title: 'Locked', image: '/path/to/locked-icon.png', locked: true },
  { id: 7, title: 'Повний курс', image: '/path/to/certificate-7.png' },
  { id: 8, title: 'Критичне мислення', image: '/path/to/certificate-8.png' },
  { id: 9, title: 'Мовний курс', image: '/path/to/certificate-9.png' },
  { id: 10, title: 'Старий друг', image: '/path/to/certificate-10.png' },
  { id: 11, title: 'Locked', image: '/path/to/locked-icon.png', locked: true },
  { id: 12, title: 'Повний курс', image: '/path/to/certificate-12.png' }, // The parrot one
];
</script>

<template>
  <div class="certificate-form">
    <div class="certificate-header">
      <div class="dropdown">
        <label for="filter-certificates">Всі</label>
        <select id="filter-certificates">
          <option value="all">Всі</option>
          <option value="completed">Завершено</option>
          <option value="in-progress">В процесі</option>
        </select>
        <span class="dropdown-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="#5F6D7E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
    </div>

    <div class="certificates-grid">
      <div
          v-for="certificate in certificates"
          :key="certificate.id"
          :class="['certificate-card', { 'locked': certificate.locked, 'parrot-card': certificate.id === 12 }]"
      >
        <div class="certificate-image">
          <img :src="certificate.image" :alt="certificate.title">
          <div v-if="certificate.locked" class="locked-overlay">
<!--            <img src="/path/to/lock-icon.png" alt="Locked" class="lock-icon">-->
          </div>
        </div>
        <div class="certificate-title" v-if="!certificate.locked">{{ certificate.title }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.certificate-form {
  padding: 20px;
}

.certificate-header {
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-start;

  .dropdown {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: #F0F0F0; /* Grey background for dropdown */
    padding: 8px 15px;
    border-radius: 12px;
    position: relative;

    label {
      font-weight: 500;
      color: #5F6D7E;
    }

    select {
      background: none;
      border: none;
      font-size: 16px;
      font-family: 'Onest', sans-serif;
      font-weight: 600;
      -webkit-appearance: none; /* Remove default arrow */
      -moz-appearance: none;
      appearance: none;
      padding-right: 25px; /* Space for custom arrow */
      cursor: pointer;
      outline: none;
    }

    .dropdown-arrow {
      position: absolute;
      right: 15px;
      pointer-events: none; /* Make arrow unclickable */
    }
  }
}

.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;

  .certificate-card {
    background-color: #F8F8FC; /* Default background for active cards */
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    height: 180px; /* Fixed height for cards */
    position: relative;
    overflow: hidden;

    &:hover:not(.locked) {
      transform: translateY(-5px);
    }

    .certificate-image {
      width: 100px; /* Adjust size of image */
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      position: relative;

      img {
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
      }
    }

    .certificate-title {
      font-weight: 600;
      font-size: 14px;
      color: #333;
      white-space: nowrap; /* Prevent text wrapping */
      overflow: hidden; /* Hide overflow text */
      text-overflow: ellipsis; /* Add ellipsis for overflow */
    }

    &.locked {
      background-color: #E0E0E0; /* Grey background for locked cards */
      cursor: not-allowed;

      .certificate-image {
        opacity: 0.5; /* Dim the image */
      }
      .locked-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3); /* Dark overlay */
        border-radius: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        .lock-icon {
          width: 50px;
          height: 50px;
          filter: invert(100%); /* Make lock icon white if it's black */
        }
      }
      .certificate-title {
        color: #888;
      }
    }

    &.parrot-card {
      background-color: #FFC107; /* Yellow background for the parrot card */
      .certificate-title {
        color: white;
      }
    }
  }
}
</style>