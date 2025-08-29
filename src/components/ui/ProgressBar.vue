<template>
  <div class="progress-indicator">
    <div class="indicator-header">
      <span class="indicator-label">{{ label }}</span>
      <span class="indicator-value">{{ normalizedValue.toFixed() }} {{ unit }}</span>
    </div>
    <div class="indicator-track">
      <div
        class="indicator-fill"
        :style="{ width: `${normalizedValue}%` }"
        :class="getStatusClass()"
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

const getStatusClass = () => {
  if (props.colorStatus) return 'indicator-fill--primary'
  if (normalizedValue.value >= 66 && normalizedValue.value < 100) {
    return 'indicator-fill--success'
  } else if (normalizedValue.value >= 33 && normalizedValue.value < 66) {
    return 'indicator-fill--warning'
  } else {
    return 'indicator-fill--danger'
  }
}
</script>

<style lang="scss" scoped>
.progress-indicator {
  width: 100%;

  .indicator-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-xs;

    .indicator-label {
      font-weight: 500;
      color: $text-color;
      font-size: 0.875rem;
    }

    .indicator-value {
      font-weight: 600;
      color: $text-color;
      font-size: 0.875rem;
    }
  }

  .indicator-track {
    width: 100%;
    height: 8px;
    background-color: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;

    .indicator-fill {
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
