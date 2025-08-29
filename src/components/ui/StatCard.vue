<template>
  <div class="data-card" :style="{ '--card-color': color }">
    <component :is="icon" class="data-icon" v-if="icon" />
    <span class="data-title">{{ title }}</span>
    <span class="data-reading">{{ value }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  icon: [String, Object],
  color: {
    type: String,
    default: 'red',
  },
})
</script>

<style lang="scss" scoped>
.data-card {
  background-color: var(--card-color, #f0f0f0);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-xs;
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
  border-radius: $border-radius-md;

  & .data-title {
    font-size: 1rem;
    font-weight: bold;
  }

  & .data-reading {
    font-size: 1.5rem;
    font-weight: 600;
  }
}
</style>
