<template>
  <div class="small-card">
    <div class="small-card-header">
      <p class="title">{{ title }}</p>
      <component :is="icon" class="icon" v-if="icon" />
    </div>
    <div class="small-card-content">
      <p class="value">{{ value }}</p>
      <Badge :value="'Good'" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import Badge from '@/components/ui/Badge.vue'

const props = defineProps({
  title: String,
  icon: [String, Object],
  value: String,
  status: String,
  statusType: {
    type: String,
    values: ['default', 'badge'],
    default: 'default',
  },
})
</script>

<style lang="scss" scoped>
.small-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;

  background-color: $card-background;
  border: 1px solid $card-border;
  border-radius: $border-radius-md;
  padding: $spacing-md;

  box-sizing: border-box;

  & .small-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-sm;

    p {
      margin: 0;
      color: $text-color;
      font-size: small;
    }

    .icon {
      width: 20px;
      height: 20px;
      color: $primary;
    }
  }

  & .small-card-content {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;

    .value {
      font-size: large;
      margin: 0;
      font-weight: bold;
    }
  }
}
</style>
