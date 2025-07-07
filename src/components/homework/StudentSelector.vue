<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Item } from '@/types';

const props = defineProps<{
  items: Item[];
  title: string;
  searchPlaceholder: string;
  noItemsText: string;
  selectAllText: string;
}>();

const selected = defineModel<number[]>({ default: [] });

const searchQuery = ref('');

const filteredItems = computed(() => {
  if (!searchQuery.value) return props.items;
  return props.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectAll = () => {
  const newValue = (selected.value?.length ?? 0) === props.items.length
      ? []
      : props.items.map(item => item.id);
  selected.value = newValue;
  console.log('StudentSelector: selectAll updated selected:', newValue);
};

const toggleItem = (itemId: number) => {
  if (!selected.value) {
    selected.value = [itemId];
  } else if (selected.value.includes(itemId)) {
    selected.value = selected.value.filter(id => id !== itemId);
  } else {
    selected.value = [...selected.value, itemId];
  }
  console.log('StudentSelector: toggleItem updated selected:', selected.value);
};
</script>

<template>
  <div class="selector">
    <div class="selector__title">{{ title }}</div>
    <div class="selector__search-container">
      <span class="selector__search-icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
              stroke="#30303D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <input
          v-model="searchQuery"
          type="text"
          :placeholder="searchPlaceholder"
          class="selector__search-input"
      />
    </div>
    <div class="selector__items-list">
      <template v-if="filteredItems.length > 0">
        <div
            class="selector__item selector__item--select-all"
            :class="{ 'selector__item--selected': selected?.length === items.length }"
            @click="selectAll"
        >
          {{ selectAllText }}
          <span v-if="selected?.length === items.length" class="selector__checkmark"></span>
        </div>
        <div
            v-for="item in filteredItems"
            :key="item.id"
            class="selector__item"
            :class="{ 'selector__item--selected': selected?.includes(item.id) }"
            @click="toggleItem(item.id)"
        >
          {{ item.name }}
          <span v-if="selected?.includes(item.id)" class="selector__checkmark"></span>
        </div>
      </template>
      <div v-else class="selector__no-items">
        {{ noItemsText }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selector {
  grid-column: 1 / 2;

  .selector__title {
    font-family: 'Onest', sans-serif;
    font-weight: 500;
    font-size: 32px;
    line-height: 24px;
    letter-spacing: -2%;
    margin-bottom: 32px;
  }

  .selector__search-container {
    position: relative;
    margin-top: 16px;

    .selector__search-icon {
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 18px;
      padding: 12px 8px;
    }

    .selector__search-input {
      width: 100%;
      padding: 12px 42px;
      border: 1.5px solid #30303d26;
      border-radius: 12px;
      font-family: 'Onest', sans-serif;
      font-size: 16px;

      &::placeholder {
        color: #aaa;
      }

      &:focus {
        outline: none;
      }
    }
  }

  .selector__items-list {
    max-height: 480px;
    overflow-y: auto;
    margin-top: 16px;
    border-radius: 4px;

    .selector__item {
      padding: 12px;
      font-family: 'Onest', sans-serif;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background-color 0.2s;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0%;

      &:hover {
        background-color: #f0f0f0;
      }

      &--selected {
        background-color: #e6f0ff;
      }

      &--select-all {
        font-weight: 600;
        color: #0066ff;
      }
    }

    .selector__no-items {
      padding: 12px;
      font-family: 'Onest', sans-serif;
      font-size: 16px;
      color: #666;
      text-align: center;
    }
  }

  .selector__checkmark {
    background-image: url("@/assets/images/icons/check.svg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
  }
}
</style>