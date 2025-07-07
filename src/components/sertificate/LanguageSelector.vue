<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = withDefaults(defineProps<{
  modelValue: string | null;
  items: { id: string; name: string }[];
  title: string;
  noItemsText: string;
}>(), {
  noItemsText: 'Мови не знайдено'
});

const emit = defineEmits(['update:modelValue']);

const selected = ref<string | null>(props.modelValue);

// Sync internal selected with modelValue
watch(() => props.modelValue, (newValue) => {
  selected.value = newValue;
}, { immediate: true });

// Emit update:modelValue when selected changes
watch(selected, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });

const toggleItem = (itemId: string) => {
  selected.value = selected.value === itemId ? null : itemId;
  console.log('LanguageSelector: toggleItem updated selected:', selected.value);
};
</script>

<template>
  <div class="selector">
    <div class="selector__title">{{ title }}</div>
    <div class="selector__items-list">
      <template v-if="items.length > 0">
        <div
            v-for="item in items"
            :key="item.id"
            class="selector__item"
            :class="{ 'selector__item--selected': selected === item.id }"
            @click="toggleItem(item.id)"
        >
          <div class="item-option">
            <span>{{ item.name }}</span>
          </div>
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
  display: flex;
  flex-direction: column;

  .selector__title {
    font-family: 'Onest', sans-serif;
    font-weight: 500;
    font-size: 32px;
    line-height: 24px;
    letter-spacing: -2%;
    margin-bottom: 32px;
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
    }

    .selector__no-items {
      padding: 12px;
      font-family: 'Onest', sans-serif;
      font-size: 16px;
      color: #666;
      text-align: center;
    }
  }

  .item-option {
    display: flex;
    align-items: center;
    gap: 13px;
    font-family: "Onest", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>