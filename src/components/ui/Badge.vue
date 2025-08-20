<template>
  <div :class="['badge', `badge--${computedState}`]">
    {{ displayValue }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: [String, Number],
    required: true,
  },
  transformer: {
    type: Function,
    default: null,
  },
  state: {
    type: String,
    default: 'default',
    validator: (value) =>
      ['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(value),
  },
})

const displayValue = computed(() => {
  if (props.transformer && typeof props.transformer === 'function') {
    return props.transformer(props.value)
  }
  return props.value
})

const computedState = computed(() => {
  // If transformer function returns an object with state, use that
  if (props.transformer && typeof props.transformer === 'function') {
    const result = props.transformer(props.value)
    if (typeof result === 'object' && result.state) {
      return result.state
    }
  }

  // Auto-determine state based on value type and content
  if (typeof props.value === 'number') {
    if (props.value >= 8) return 'success'
    if (props.value >= 6) return 'warning'
    if (props.value < 4) return 'danger'
    return 'primary'
  }

  if (typeof props.value === 'string') {
    if (props.value.includes('%')) {
      const numValue = parseFloat(props.value)
      if (numValue >= 80) return 'success'
      if (numValue >= 50) return 'warning'
      if (numValue < 20) return 'danger'
      return 'primary'
    }
    if (props.value.includes('giorni') || props.value.includes('days')) {
      return 'info'
    }
  }

  return props.state
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

  // Hover effects
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }

  // State variations - Solid (default)
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
}
</style>
