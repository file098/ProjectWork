<template>
  <div :class="['badge', `badge--${computedState}`]">
    {{ computedValue }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  state: {
    type: String,
    default: 'default',
    validator: (value) => ['good', 'average', 'bad'].includes(value),
  },
  transformer: {
    type: Function,
    default: null,
  },
})

const computedValue = computed(() => {
  const stateTextMap = {
    good: 'Good',
    average: 'Average',
    bad: 'Bad',
  }

  return stateTextMap[computedState.value] || computedState.value
})

const computedState = computed(() => {
  // Map legacy states to new good/average/bad states
  const stateMapping = {
    success: 'good',
    warning: 'average',
    danger: 'bad',
  }

  return stateMapping[props.state] || props.state
})
</script>

<style scoped lang="scss">
.badge {
  width: min-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
  border-radius: 1rem;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }

  &--default {
    background-color: $badge-background-color;
    color: $badge-text-color;
  }

  &--primary {
    background-color: $badge-primary-background-color;
    color: $badge-primary-text-color;
  }

  &--success {
    background-color: $badge-success-background-color;
    color: $badge-success-text-color;
  }

  &--warning {
    background-color: $badge-warning-background-color;
    color: $badge-warning-text-color;
  }

  &--danger {
    background-color: $badge-danger-background-color;
    color: $badge-danger-text-color;
  }

  &--info {
    background-color: $badge-info-background-color;
    color: $badge-info-text-color;
  }

  &--good {
    background-color: $badge-good-background-color;
    color: $badge-good-text-color;
  }

  &--average {
    background-color: $badge-average-background-color;
    color: $badge-average-text-color;
  }

  &--bad {
    background-color: $badge-bad-background-color;
    color: $badge-bad-text-color;
  }
}
</style>
