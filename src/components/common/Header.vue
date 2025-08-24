<template>
  <header>
    <div class="title-container">
      <h1>Project Dashboard</h1>
      <p>Manage your projects efficiently</p>
    </div>
    <div class="actions">
      <Select v-model="selectedPeriod" :options="periodOptions" name="period" id="period-select" />
      <Button @click="startSimulation">Start Simulation</Button>
    </div>
  </header>
</template>

<script setup>
import Button from '@/components/ui/Button.vue'
import Select from '@/components/ui/Select.vue'
import { ref } from 'vue'

const emit = defineEmits(['start-simulation'])

const selectedPeriod = ref('7')

const periodOptions = [
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' },
]

const startSimulation = () => {
  emit('start-simulation', selectedPeriod.value)
}

startSimulation()
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

  .title-container {
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

  .actions {
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }
}
</style>
