<template>
  <div class="select-wrapper">
    <select :id="id" :name="name" v-model="modelValue" class="custom-select" :aria-label="name">
      <template v-if="options && options.length">
        <option
          v-for="option in options"
          :key="typeof option === 'object' ? option.value : option"
          :value="typeof option === 'object' ? option.value : option"
        >
          {{ typeof option === 'object' ? option.label : getOptionLabel(option) }}
        </option>
      </template>
      <slot v-else></slot>
    </select>
    <div class="select-arrow">
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 1.5L6 6.5L11 1.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineModel } from 'vue'

const modelValue = defineModel('modelValue', {
  type: [String, Number],
  default: '',
})

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
})

const getOptionLabel = (option) => {
  const labelMap = {
    daily: '7 Days',
    weekly: '30 Days',
    monthly: '90 Days',
    7: '7 Days',
    30: '30 Days',
    90: '90 Days',
  }
  return labelMap[option] || option
}
</script>

<style lang="scss" scoped>
.select-wrapper {
  position: relative;
  display: inline-block;

  .custom-select {
    appearance: none;
    background-color: #ffffff;
    border: 2px solid #d1d5db;
    border-radius: $border-radius-md;
    padding: 12px 40px 12px 16px;
    font-size: 14px;
    font-weight: 500;
    color: $text-color;
    cursor: pointer;
    min-width: 140px;
    transition: all 0.2s ease;

    &:hover {
      border-color: #9ca3af;
    }

    &:focus {
      outline: none;
      border-color: $primary;
      box-shadow: 0 0 0 3px rgba(51, 51, 51, 0.1);
    }
  }

  .select-arrow {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #6b7280;
    transition: transform 0.2s ease;
  }

  &:hover .select-arrow {
    color: $text-color;
  }
}
.select-wrapper:focus-within .select-arrow {
  transform: translateY(-50%) rotate(180deg);
}
</style>
