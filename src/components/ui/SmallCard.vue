<template>
  <div class="metric-card">
    <div class="metric-header">
      <p class="metric-name">{{ title }}</p>
      <component :is="icon" class="metric-icon" v-if="icon" />
    </div>
    <div class="metric-data">
      <p class="metric-reading">{{ value }} {{ unit }}</p>
      <Badge :state="state" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import Badge from '@/components/ui/Badge.vue'

const props = defineProps({
  title: String,
  icon: [String, Object],
  unit: String,
  state: {
    type: String,
    default: 'good',
    validator: (value) => ['good', 'average', 'bad'].includes(value),
  },
  value: {
    type: String,
    default: '0',
  },
})
</script>

<style lang="scss" scoped>
.metric-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;

  background-color: $card-background;
  border: 1px solid $card-border;
  border-radius: $border-radius-md;
  padding: $spacing-md;

  box-sizing: border-box;

  & .metric-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-sm;

    p {
      margin: 0;
      color: $text-color;
      font-size: small;
    }

    .metric-icon {
      width: 20px;
      height: 20px;
      color: $primary;
    }
  }

  & .metric-data {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;

    .metric-reading {
      font-size: large;
      margin: 0;
      font-weight: bold;
    }
  }
}
</style>
