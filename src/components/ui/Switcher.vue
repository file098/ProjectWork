<template>
  <div class="switcher">
    <div
      class="option"
      :class="{ active: activeOption === 'Dati Ambientali' }"
      @click="switchOption('Dati Ambientali')"
    >
      Dati Ambientali
    </div>
    <div
      class="option"
      :class="{ active: activeOption === 'Produzione' }"
      @click="switchOption('Produzione')"
    >
      Produzione
    </div>
    <div
      class="option"
      :class="{ active: activeOption === 'Performance Finanziaria' }"
      @click="switchOption('Performance Finanziaria')"
    >
      Performance Finanziaria
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['option-changed'])

const activeOption = ref('Dati Ambientali')

function switchOption(option) {
  if (option !== activeOption.value) {
    activeOption.value = option
    emit('option-changed', option)
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
    padding: 12px 16px;
    color: #333;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;

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
</style>
