<template>
  <button :class="buttonClasses" :type="type" :disabled="disabled" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value),
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])

const buttonClasses = computed(() => [
  'custom-button',
  `button--${props.variant}`,
  `button--${props.size}`,
  {
    'button--disabled': props.disabled,
  },
])
</script>

<style lang="scss" scoped>
.custom-button {
  border: none;
  border-radius: $border-radius-md;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:focus {
    outline: none;
  }

  &.button--primary {
    background-color: #1f2937;
    color: #ffffff;

    &:hover:not(.button--disabled) {
      background-color: #111827;
    }

    &:focus {
      box-shadow: 0 0 0 3px rgba(31, 41, 55, 0.3);
    }
  }

  &.button--secondary {
    background-color: $secondary;
    color: #ffffff;

    &:hover:not(.button--disabled) {
      background-color: #059669;
    }

    &:focus {
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
    }
  }

  &.button--outline {
    background-color: transparent;
    color: $text-color;
    border: 2px solid #d1d5db;

    &:hover:not(.button--disabled) {
      background-color: #f9fafb;
      border-color: #9ca3af;
    }

    &:focus {
      border-color: $primary;
      box-shadow: 0 0 0 3px rgba(51, 51, 51, 0.1);
    }
  }

  &.button--small {
    padding: 8px 16px;
    font-size: 14px;
  }

  &.button--medium {
    padding: 12px 20px;
    font-size: 14px;
  }

  &.button--large {
    padding: 16px 24px;
    font-size: 16px;
  }

  &.button--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
