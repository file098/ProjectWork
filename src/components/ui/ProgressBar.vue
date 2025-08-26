<template>
  <div class="progress-bar">
    <div class="progress-header">
      <span class="progress-label">{{ label }}</span>
      <span class="progress-value">{{ normalizedValue.toFixed() }} {{ unit }}</span>
    </div>
    <div class="progress-track">
      <div
        class="progress-fill"
        :style="{ width: `${normalizedValue}%` }"
        :class="getProgressClass()"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    default: '%',
  },
  colorStatus: {
    type: Boolean,
    default: false,
  },
})

const normalizedValue = computed(() => {
  const safeValue = isNaN(props.value) ? 0 : props.value || 0
  if (props.max) return (safeValue / props.max) * 100
  return safeValue
})

const getProgressClass = () => {
  if (props.colorStatus) return 'progress-fill--primary'
  if (normalizedValue.value >= 66 && normalizedValue.value < 100) {
    return 'progress-fill--success'
  } else if (normalizedValue.value >= 33 && normalizedValue.value < 66) {
    return 'progress-fill--warning'
  } else {
    return 'progress-fill--danger'
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;

  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-xs;

    .progress-label {
      font-weight: 500;
      color: $text-color;
      font-size: 0.875rem;
    }

    .progress-value {
      font-weight: 600;
      color: $text-color;
      font-size: 0.875rem;
    }
  }

  .progress-track {
    width: 100%;
    height: 8px;
    background-color: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;

    .progress-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.3s ease;

      &--primary {
        background-color: #3b82f6;
      }

      &--success {
        background-color: #10b981;
      }

      &--warning {
        background-color: #f59e0b;
      }

      &--danger {
        background-color: #ef4444;
      }

      &--info {
        background-color: #06b6d4;
      }
    }
  }
}
</style>
