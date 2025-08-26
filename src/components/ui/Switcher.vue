<template>
  <div class="switcher">
    <div
      class="option"
      :class="{ active: modelValue === 'Environmental Data' }"
      @click="switchOption('Environmental Data')"
    >
      <span class="full-text">Environmental Data</span>
      <span class="short-text">Env.</span>
    </div>
    <div
      class="option"
      :class="{ active: modelValue === 'Production' }"
      @click="switchOption('Production')"
    >
      <span class="full-text">Production</span>
      <span class="short-text">Prod.</span>
    </div>
    <div
      class="option"
      :class="{ active: modelValue === 'Financial Performance' }"
      @click="switchOption('Financial Performance')"
    >
      <span class="full-text">Financial Performance</span>
      <span class="short-text">Finance</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'Environmental Data',
  },
})

const emit = defineEmits(['update:modelValue'])

const activeOption = computed(() => props.modelValue)

function switchOption(option) {
  if (option !== props.modelValue) {
    emit('update:modelValue', option)
  }
}
</script>

<style lang="scss" scoped>
.switcher {
  display: flex;
  justify-content: space-between;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 4px;
  gap: 4px;

  .option {
    flex: 1;
    text-align: center;
    padding: 12px 8px;
    color: #333;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
    font-size: 0.9rem;
    min-height: 44px; // Touch target size
    display: flex;
    align-items: center;
    justify-content: center;

    .short-text {
      display: none;
    }

    .full-text {
      display: block;
    }

    &.active {
      background-color: #fff;
      color: #000;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    &:hover:not(.active) {
      background-color: #e8e8e8;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}

@media (max-width: 768px) {
  .switcher {
    gap: 2px;
    padding: 2px;

    .option {
      padding: 10px 4px;
      font-size: 0.8rem;

      .full-text {
        display: none;
      }

      .short-text {
        display: block;
      }
    }
  }
}

@media (max-width: 480px) {
  .switcher {
    .option {
      font-size: 0.75rem;
      padding: 8px 2px;
    }
  }
}
</style>
