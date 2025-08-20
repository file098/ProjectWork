<template>
  <header>
    <div class="title-container">
      <h1>Project Dashboard</h1>
      <p>Manage your projects efficiently</p>
    </div>
    <div class="actions">
      <Select v-model="selectedPeriod" :options="periodOptions" name="period" id="period-select" />
      <Button>Avvia Simulazione</Button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/ui/Button.vue'
import Select from '@/components/ui/Select.vue'

const selectedPeriod = ref('weekly')

const periodOptions = [
  { value: 'daily', label: '7 giorni' },
  { value: 'weekly', label: '30 giorni' },
  { value: 'monthly', label: '90 giorni' },
]
</script>
<style lang="scss" scoped>
header {
  padding: $spacing-md;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  background-color: $background-color;

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
