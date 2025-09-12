<template>
  <header>
    <div class="page-header">
      <h1>Project Dashboard</h1>
      <p>Manage your projects efficiently</p>
    </div>
    <div class="header-actions">
      <Select v-model="timeframe" :options="timeframeOptions" name="period" id="period-select" />
      <Button @click="initiateSimulation" aria-label="Start simulation for the selected time period"
        >Start Simulation</Button
      >
    </div>
  </header>
</template>

<script setup>
import Button from '@/components/ui/Button.vue'
import Select from '@/components/ui/Select.vue'
import { ref } from 'vue'

const emit = defineEmits(['start-simulation'])

const timeframe = ref('7')

const timeframeOptions = [
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' },
]

const initiateSimulation = () => {
  emit('start-simulation', timeframe.value)
}

initiateSimulation()
</script>

<style lang="scss" scoped>
header {
  padding: $spacing-md;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: $background-color;
  gap: $spacing-md;

  .page-header {
    display: flex;
    flex-flow: column;
    gap: $spacing-xs;

    h1 {
      margin: 0;
      color: $text-color;
    }

    p {
      margin: 0;
      color: $text-secondary-color;
      font-size: 0.875rem;
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }
}
</style>
